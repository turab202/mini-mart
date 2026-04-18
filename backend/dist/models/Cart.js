"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const cartSchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    sessionId: { type: String },
    items: [{
            productId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Product', required: true },
            name: String,
            price: Number,
            quantity: { type: Number, default: 1 },
            image: String
        }],
    updatedAt: { type: Date, default: Date.now }
});
exports.default = mongoose_1.default.model('Cart', cartSchema);
