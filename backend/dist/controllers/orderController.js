"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatus = exports.getOrders = exports.createOrder = void 0;
const Order_1 = __importDefault(require("../models/Order"));
const Cart_1 = __importDefault(require("../models/Cart"));
const createOrder = async (req, res) => {
    try {
        const order = await Order_1.default.create(req.body);
        await Cart_1.default.findOneAndDelete({ sessionId: req.body.sessionId });
        res.status(201).json(order);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.createOrder = createOrder;
const getOrders = async (req, res) => {
    try {
        const { status, page = 1, limit = 20 } = req.query;
        const query = {};
        if (status)
            query.orderStatus = status;
        const orders = await Order_1.default.find(query)
            .sort({ createdAt: -1 })
            .skip((Number(page) - 1) * Number(limit))
            .limit(Number(limit));
        const total = await Order_1.default.countDocuments(query);
        res.json({ orders, total, page: Number(page), totalPages: Math.ceil(total / Number(limit)) });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getOrders = getOrders;
const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order_1.default.findByIdAndUpdate(req.params.id, { orderStatus: req.body.status }, { new: true });
        res.json(order);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.updateOrderStatus = updateOrderStatus;
