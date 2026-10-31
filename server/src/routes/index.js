import express from 'express';
import authRoutes from './authRoutes.js';
import productRoutes from './productRoutes.js';
import planRoutes from './planRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/plans', planRoutes);

export default router;
