import { Request, Response } from 'express';
import Order from '../models/Order';
import Cart from '../models/Cart';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.create(req.body);
    await Cart.findOneAndDelete({ sessionId: req.body.sessionId });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query: any = {};
    if (status) query.orderStatus = status;
    
    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));
    
    const total = await Order.countDocuments(query);
    res.json({ orders, total, page: Number(page), totalPages: Math.ceil(total / Number(limit)) });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus: req.body.status },
      { new: true }
    );
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};