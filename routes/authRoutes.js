import express from 'express';
import { login, register, logout, forgotPassword, resetPassword } from '../controllers/authController.js';
import dotenv from 'dotenv';
import prisma from '../utils/prismaClient.js';
import { upload } from '../utils/multer.js';
import { createUserSchema, loginUserSchema, forgotPasswordSchema } from '../utils/validators/user.validator.js';
import { validateRequest } from '../middlewares/validateRequest.js';

dotenv.config();

const router = express.Router();

router.post('/register', upload.single('profileImage'), validateRequest(createUserSchema), register);
router.post('/login', validateRequest(loginUserSchema), login);
router.post('/logout', logout);
router.post('/forgot-password', validateRequest(forgotPasswordSchema), forgotPassword);
router.get('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const isValidToken = await prisma.passwordResetToken.findUnique({ where: { token } });
    if (!isValidToken || isValidToken.expiresAt < new Date()) {
        return res.status(400).send('Invalid or expired token');
    }

    res.render('resetPassword', { token });
});
router.post('/reset-password/:token', resetPassword);

export default router;



