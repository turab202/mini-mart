"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const register = async (req, res) => {
    try {
        if (!req.body || !req.body.name || !req.body.email || !req.body.password || !req.body.phone) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const { name, email, password, phone } = req.body;
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await User_1.default.create({
            name, email, password: hashedPassword, phone
        });
        const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
        res.status(201).json({ token, user: { id: user._id, name, email, role: user.role } });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        console.log('Login attempt - Body:', req.body); // ADD THIS
        console.log('Headers:', req.headers['content-type']); // ADD THIS
        const { email, password } = req.body;
        if (!email || !password) {
            console.log('Missing email or password'); // ADD THIS
            return res.status(400).json({ message: 'Email and password required' });
        }
        const user = await User_1.default.findOne({ email });
        console.log('User found:', user ? 'Yes' : 'No'); // ADD THIS
        if (!user)
            return res.status(400).json({ message: 'Invalid credentials' });
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        console.log('Password match:', isMatch); // ADD THIS
        if (!isMatch)
            return res.status(400).json({ message: 'Invalid credentials' });
        const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
        res.json({ token, user: { id: user._id, name: user.name, email, role: user.role } });
    }
    catch (error) {
        console.error('Login error:', error); // ADD THIS
        res.status(500).json({ message: 'Server error' });
    }
};
exports.login = login;
