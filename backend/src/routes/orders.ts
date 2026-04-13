import { Router } from 'express';
import { createOrder, getOrders, updateOrderStatus } from '../controllers/orderController';
import { auth, adminAuth } from '../middleware/auth';

const router = Router();
router.post('/', createOrder);
router.get('/', auth, adminAuth, getOrders);
router.patch('/:id/status', auth, adminAuth, updateOrderStatus);

export default router;