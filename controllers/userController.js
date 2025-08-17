import { UserResource } from "../resources/UserResource.js";
import prisma from "../utils/prismaClient.js";
import bcrypt from "bcrypt";


export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const profileImage = req.file?.filename ? `/uploads/profiles/${req.file.filename}` : null;

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                profileImage: profileImage
            }
        })

        res.status(200).json({
            status: true,
            message: "User created successfully",
            data: UserResource(user)
        });
    }
    catch (err) {
        res.status(500).json({
            status: false,
            message: 'User creation failed',
            error: err.message
        })
    }
}

// get getAllUsers
export const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        if (users.length === 0) {
            res.status(404).json({
                status: false,
                message: "No users found"
            })
        }
        res.status(200).json({
            status: true,
            message: "Users found",
            data: users.map(user => UserResource(user))

        })
    } catch (err) {
        res.status(500).json({
            status: false,
            message: 'Failed to get users',
            error: err.message
        })
    }
}


// get user by id

export const getUserById = async (req, res) => {
    const { id } = req.params.id;
    console.log(id);
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        });

        if (!user) {
            res.status(404).json({
                status: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            status: true,
            message: "User found successfully",
            data: UserResource(user)
        })


    } catch (err) {
        res.status(500).json({
            status: false,
            message: 'Failed to get user',
            error: err.message
        })
    }
}

// update user by id
export const updateUser = async (req, res) => {
    console.log(req.params.id);
    try {
        const { name, email } = req.body;
        const existingUser = await prisma.user.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        });

        if (!existingUser) {
            return res.status(404).json({
                status: false,
                message: 'User not found'
            });
        }

        let profileImage = existingUser.profileImage;
        if (req.file) {
            profileImage = `/uploads/profiles/${req.file.filename}`;
        }

        const user = await prisma.user.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: {
                name,
                email,
                profileImage
                // password
            }
        })

        res.status(200).send({
            status: true,
            message: "User updated successfully",
            data: UserResource(user)
        })
    } catch (err) {

    }
}


// delete user by id
export const deleteUser = async (req, res) => {
    try {
        await prisma.user.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })

        res.status(200).json({
            status: true,
            message: "User deleted successfully"
        })
    } catch (err) {
        res.status(500).send({
            status: false,
            message: 'Failed to delete user',
            error: err.message
        })
    }
}


export const changePassword = async (req, res) => {
    // try {
    const userId = req.user.userId; //coming from Authentication middleware
    // console.log(req.user.userId);
    const { oldPassword, password } = req.body;

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });

    if (!user) {
        return res.status(404).send({
            status: false,
            message: 'User not found'
        });
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
        return res.status(400).send({
            status: false,
            message: 'Old password is incorrect'
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            password: hashedPassword
        }
    });

    return res.status(200).send({
        status: true,
        message: 'Password changed successfully'
    });

    // }
    //     catch (err) {
    return res.status(500).send({
        status: false,
        message: 'Failed to change password',
        error: err.message
    })
    // }
}


