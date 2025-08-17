import Joi from 'joi';

// register and create user 
export const createUserSchema = Joi.object({
    name: Joi.string().min(3).max(50).required().messages({
        'string.base': 'Name must be a string',
        'string.min': 'Name must be at least 3 characters long',
        'string.max': 'Name must be at most 50 characters long',
        'any.required': 'Name is required'
    }),
    email: Joi.string().email().required().messages({
        'string.base': 'Email must be a string',
        'string.email': 'Email must be a valid email',
        'any.required': 'Email is required'
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters long',
        'any.required': 'Password is required'
    }),
    profileImage: Joi.string().required()
});


export const updateUserSchema = Joi.object({
    name: Joi.string().min(3).max(50).required().messages({
        'string.base': 'Name must be a string',
        'string.min': 'Name must be at least 3 characters long',
        'string.max': 'Name must be at most 50 characters long',
        'any.required': 'Name is required'
    }),
    email: Joi.string().email().required().messages({
        'string.base': 'Email must be a string',
        'string.email': 'Email must be a valid email',
        'any.required': 'Email is required'
    }),
    profileImage: Joi.string().optional()
});


//Login User
export const loginUserSchema = Joi.object({
    email: Joi.string().min(3).max(50).required().messages({
        'string.base': 'Email must be a string',
        'string.min': 'Email must be at least 3 characters long',
        'string.max': 'Email must be at most 50 characters long',
        'any.required': 'Email is required'
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters long',
        'any.required': 'Password is required'
    }),
})


// Forgot Password
export const forgotPasswordSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.base': 'Email must be a string',
        'string.email': 'Email must be a valid email',
        'any.required': 'Email is required'
    })
})


export const changePasswordSchema = Joi.object({
    oldPassword: Joi.string().min(6).required().messages({
        'string.empty': 'Old Password is required',
        'string.min': 'Old Password must be at least 6 characters long',
        'any.required': 'Old Password is required'
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters long',
        'any.required': 'Password is required'
    })
})

