import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../utils/prismaClient.js';
import { UserResource } from '../resources/UserResource.js';
import crypto from 'crypto';
import { sendEmail } from '../utils/mailer.js';
import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




export const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const profileImage = req.file ? `/uploads/profiles/${req.file.filename}` : null;


        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                profileImage: profileImage
            },
        });

        res.status(201).send({
            status: true,
            message: "User registered successfully",
            data: UserResource(user)
        });

    } catch (err) {
        res.status(500).send({
            status: false,
            message: "Registration failed. Please try again.",
            error: err.message
        })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        console.log(user);
        if (!user) {
            res.status(404).send({
                status: false,
                message: "User not found. Please register first."
            })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        //console.log(isPasswordValid);
        if (!isPasswordValid) {
            res.status(401).send({
                status: false,
                message: "Invalid password. Please try again."
            })
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
        await prisma.token.create({
            data: {
                token,
                expiresAt: expiresAt,
                createdAt: new Date(),
                userId: user.id
            }
        });
        res.status(200).send({
            sttaus: true,
            message: "Login successful",
            data: {
                token,
                user: UserResource(user)
            }
        })
    } catch (err) {
        res.status(500).send({
            status: false,
            message: "Login failed. Please try again.",
            error: err.message
        })
    }
}


//logout
export const logout = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).send({
                status: false,
                message: "No token provided"
            })
        }
        await prisma.token.deleteMany({
            where: {
                token
            }
        })

        res.status(200).send({
            status: true,
            message: "Logout successfully"
        })


    } catch (err) {
        res.status(500).send({
            status: false,
            message: "Logout failed. Please try again.",
            error: err.message
        })
    }
}

//forgotPassword
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if (!user) {
            return res.status(404)
                .send({
                    status: false,
                    message: "User not found"
                })
        }
        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 1000 * 60 * 30); // 30 minutes

        await prisma.passwordResetToken.create({
            data: {
                token,
                expiresAt,
                userId: user.id
            }
        })

        const resetLink = `${process.env.FRONTEND_URL}/api/auth / reset - password / ${token} `;
        const logoUrl = `${process.env.FRONTEND_URL}/${process.env.APP_LOGO}`;
        const templatePath = path.join(__dirname, '../views/emailResetTemplate.ejs');
        // console.log(templatePath);
        console.log(logoUrl);
        const html = await ejs.renderFile(templatePath, { resetLink, logoUrl });
        // console.log(email);
        await sendEmail({
            to: email,
            subject: "Reset Password",
            html
        });

        res.status(200).send({
            status: true,
            message: "Password reset link sent to your email"
        })


    } catch (err) {
        res.status(500).send({
            status: false,
            message: "Password reset failed. Please try again.",
            error: err.message
        })
    }
}

//resetPassword

export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        console.log(req.body);
        // var password = req.body.password;
        // var confirmPassword = req.body.confirmPassword;

        const { password, confirmPassword } = req.body;
        // console.log(password, confirmPassword);
        if (password !== confirmPassword) {
            return res.status(400).send({
                status: false,
                message: "Passwords do not match"
            });
        }
        const resetToken = await prisma.passwordResetToken.findUnique({
            where: {
                token
            }
        })

        if (!resetToken || resetToken.expiresAt < new Date()) {
            return res.status(404).send({
                status: false,
                message: "Invalid token or token expired"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.update({
            where: {
                id: resetToken.userId
            },
            data: {
                password: hashedPassword
            }
        });

        await prisma.passwordResetToken.delete({ where: { token } });

        // res.status(200).send({
        //     status: true,
        //     message: "Password reset successfully"
        // });
        res.render('success', { message: 'Password reset successfully', logoUrl: `${process.env.FRONTEND_URL}/${process.env.APP_LOGO}` }); // Show success message
    }
    catch (err) {
        res.status(500).send({
            status: false,
            message: "Password reset failed. Please try again.",
            error: err.message
        })
    }
}