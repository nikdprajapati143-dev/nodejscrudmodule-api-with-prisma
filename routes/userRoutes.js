import express from 'express';
import dotenv from 'dotenv';
import { createUser, getAllUsers, getUserById, updateUser, deleteUser, changePassword } from '../controllers/userController.js';
import Authentication from '../middlewares/authMiddleware.js';
import { upload } from '../utils/multer.js';
import { createUserSchema, updateUserSchema, changePasswordSchema } from '../utils/validators/user.validator.js';
import { validateRequest } from '../middlewares/validateRequest.js';

dotenv.config();

const router = express.Router();

router.post('/create', upload.single('profileImage'), Authentication, validateRequest(createUserSchema), createUser);
router.get('/getAllUsers', Authentication, getAllUsers);
router.get('/getUser/:id', Authentication, getUserById);
router.put('/updateUser/:id', upload.single('profileImage'), Authentication, validateRequest(updateUserSchema), updateUser);
router.delete('/deleteUser/:id', Authentication, deleteUser);
router.post('/changePassword', Authentication, validateRequest(changePasswordSchema), changePassword);


export default router;
