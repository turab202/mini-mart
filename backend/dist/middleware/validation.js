"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationErrors = exports.validateOrder = exports.validateProduct = exports.validateLogin = exports.validateRegister = void 0;
const express_validator_1 = require("express-validator");
// Validation rules for user registration
exports.validateRegister = [
    (0, express_validator_1.body)('name').notEmpty().withMessage('Name is required').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    (0, express_validator_1.body)('email').isEmail().withMessage('Please provide a valid email').normalizeEmail(),
    (0, express_validator_1.body)('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    (0, express_validator_1.body)('phone').optional().isMobilePhone('any').withMessage('Please provide a valid phone number')
];
// Validation rules for user login
exports.validateLogin = [
    (0, express_validator_1.body)('email').isEmail().withMessage('Please provide a valid email').normalizeEmail(),
    (0, express_validator_1.body)('password').notEmpty().withMessage('Password is required')
];
// Validation rules for product creation/update
exports.validateProduct = [
    (0, express_validator_1.body)('name').notEmpty().withMessage('Product name is required').trim(),
    (0, express_validator_1.body)('description').notEmpty().withMessage('Description is required'),
    (0, express_validator_1.body)('price').isNumeric().withMessage('Price must be a number').isFloat({ min: 0 }).withMessage('Price must be positive'),
    (0, express_validator_1.body)('category').notEmpty().withMessage('Category is required'),
    (0, express_validator_1.body)('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
    (0, express_validator_1.body)('images').optional().isArray().withMessage('Images must be an array')
];
// Validation rules for order creation
exports.validateOrder = [
    (0, express_validator_1.body)('customerName').notEmpty().withMessage('Customer name is required'),
    (0, express_validator_1.body)('customerPhone').notEmpty().withMessage('Phone number is required'),
    (0, express_validator_1.body)('deliveryAddress').notEmpty().withMessage('Delivery address is required'),
    (0, express_validator_1.body)('deliveryDate').isISO8601().withMessage('Valid delivery date is required'),
    (0, express_validator_1.body)('paymentMethod').isIn(['telegram', 'chapa', 'cbe']).withMessage('Invalid payment method'),
    (0, express_validator_1.body)('items').isArray({ min: 1 }).withMessage('Order must have at least one item'),
    (0, express_validator_1.body)('total').isNumeric().withMessage('Total must be a number')
];
// Validation error handler middleware
const handleValidationErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array()
        });
    }
    next();
};
exports.handleValidationErrors = handleValidationErrors;
