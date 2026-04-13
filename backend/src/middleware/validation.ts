import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

// Validation rules for user registration
export const validateRegister = [
  body('name').notEmpty().withMessage('Name is required').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').isEmail().withMessage('Please provide a valid email').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('phone').optional().isMobilePhone('any').withMessage('Please provide a valid phone number')
];

// Validation rules for user login
export const validateLogin = [
  body('email').isEmail().withMessage('Please provide a valid email').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required')
];

// Validation rules for product creation/update
export const validateProduct = [
  body('name').notEmpty().withMessage('Product name is required').trim(),
  body('description').notEmpty().withMessage('Description is required'),
  body('price').isNumeric().withMessage('Price must be a number').isFloat({ min: 0 }).withMessage('Price must be positive'),
  body('category').notEmpty().withMessage('Category is required'),
  body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
  body('images').optional().isArray().withMessage('Images must be an array')
];

// Validation rules for order creation
export const validateOrder = [
  body('customerName').notEmpty().withMessage('Customer name is required'),
  body('customerPhone').notEmpty().withMessage('Phone number is required'),
  body('deliveryAddress').notEmpty().withMessage('Delivery address is required'),
  body('deliveryDate').isISO8601().withMessage('Valid delivery date is required'),
  body('paymentMethod').isIn(['telegram', 'chapa', 'cbe']).withMessage('Invalid payment method'),
  body('items').isArray({ min: 1 }).withMessage('Order must have at least one item'),
  body('total').isNumeric().withMessage('Total must be a number')
];

// Validation error handler middleware
export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false,
      message: 'Validation failed', 
      errors: errors.array() 
    });
  }
  next();
};