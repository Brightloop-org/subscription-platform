import express from 'express';
import {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  addStaff,
  getStaff
} from '../controllers/authController.js';
import { protect, requireRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

// Protected routes (Any authenticated user)
router.get('/me', protect, getMe);

// Admin-only routes (Managing staff)
router.post('/staff', protect, requireRole('admin'), addStaff);
router.get('/staff', protect, requireRole('admin'), getStaff);

export default router;
