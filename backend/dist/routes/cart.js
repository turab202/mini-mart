"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Cart_1 = __importDefault(require("../models/Cart"));
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Get cart by session ID
router.get('/:sessionId', auth_1.optionalAuth, async (req, res) => {
    try {
        let cart = await Cart_1.default.findOne({ sessionId: req.params.sessionId });
        if (!cart) {
            cart = await Cart_1.default.create({
                sessionId: req.params.sessionId,
                items: []
            });
        }
        res.json(cart);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
// Sync cart (for logged-in users)
router.post('/sync', auth_1.optionalAuth, async (req, res) => {
    try {
        const { sessionId, items } = req.body;
        let cart = await Cart_1.default.findOne({ sessionId });
        if (cart) {
            cart.items = items;
            cart.updatedAt = new Date();
            await cart.save();
        }
        else {
            cart = await Cart_1.default.create({ sessionId, items });
        }
        // If user is logged in, also save to user's cart
        if (req.user) {
            let userCart = await Cart_1.default.findOne({ user: req.user._id });
            if (userCart) {
                userCart.items = items;
                userCart.updatedAt = new Date();
                await userCart.save();
            }
            else {
                await Cart_1.default.create({ user: req.user._id, items, sessionId });
            }
        }
        res.json(cart);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.default = router;
