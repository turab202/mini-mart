"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getProducts = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const getProducts = async (req, res) => {
    try {
        const { category, search, page = 1, limit = 20, admin, isFeatured } = req.query;
        const query = admin === 'true' ? {} : { isActive: true };
        if (category)
            query.category = category;
        if (search)
            query.name = { $regex: search, $options: 'i' };
        if (isFeatured === 'true')
            query.isFeatured = true;
        const products = await Product_1.default.find(query)
            .skip((Number(page) - 1) * Number(limit))
            .limit(Number(limit));
        const total = await Product_1.default.countDocuments(query);
        res.json({ products, total, page: Number(page), totalPages: Math.ceil(total / Number(limit)) });
    }
    catch (error) {
        console.error('getProducts error:', error);
        res.status(500).json({ message: 'Server error', detail: String(error) });
    }
};
exports.getProducts = getProducts;
const getProductById = async (req, res) => {
    try {
        const product = await Product_1.default.findById(req.params.id);
        if (!product)
            return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getProductById = getProductById;
const createProduct = async (req, res) => {
    try {
        const product = await Product_1.default.create(req.body);
        res.status(201).json(product);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.createProduct = createProduct;
const updateProduct = async (req, res) => {
    try {
        const product = await Product_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    try {
        await Product_1.default.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.deleteProduct = deleteProduct;
