"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const userSchema = new mongoose_1.default.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    role: String
});
const User = mongoose_1.default.model('User', userSchema);
const updateAdminRole = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mini-mart');
        console.log('Connected to MongoDB');
        const result = await User.updateOne({ email: 'admin@minimart.com' }, { $set: { role: 'admin' } });
        if (result.modifiedCount > 0) {
            console.log('✅ Admin role updated successfully!');
        }
        else {
            console.log('User not found or role already set');
        }
        process.exit(0);
    }
    catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};
updateAdminRole();
