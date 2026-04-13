import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderId: { type: String, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerPhone: { type: String, required: true },
  deliveryAddress: { type: String, required: true },
  deliveryDate: { type: Date, required: true },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    price: Number,
    quantity: Number,
    image: String
  }],
  subtotal: { type: Number, required: true },
  deliveryFee: { type: Number, default: 150 },
  total: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['telegram', 'chapa', 'cbe'], required: true },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  orderStatus: { type: String, enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
  transactionId: { type: String },
  receiptUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});

orderSchema.pre('save', function(next) {
  if (!this.orderId) {
    this.orderId = 'MM-' + Date.now().toString(36).toUpperCase();
  }
  next();
});

export default mongoose.model('Order', orderSchema);