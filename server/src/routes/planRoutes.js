import express from 'express';
import { getPlans, createPlan, updatePlan, deletePlan } from '../controllers/planController.js';
import { protect, requireRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getPlans);
router.post('/', protect, requireRole('admin'), createPlan);
router.put('/:id', protect, requireRole('admin'), updatePlan);
router.delete('/:id', protect, requireRole('admin'), deletePlan);

export default router;
