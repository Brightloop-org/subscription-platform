import express from 'express';
import { register, login, getMe, addStaff, forgotPassword } from '../controllers/authController.js';
import { protect, requireRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/forgot-password', forgotPassword);
router.post('/staff', protect, requireRole('admin'), addStaff);

export default router;
