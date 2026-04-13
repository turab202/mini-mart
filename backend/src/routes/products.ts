import { Router } from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productController';
import { auth, adminAuth } from '../middleware/auth';

const router = Router();
router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', auth, adminAuth, createProduct);
router.put('/:id', auth, adminAuth, updateProduct);
router.delete('/:id', auth, adminAuth, deleteProduct);

export default router;