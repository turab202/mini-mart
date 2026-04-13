import { Router } from 'express';
import Cart from '../models/Cart';
import { auth, optionalAuth } from '../middleware/auth';

const router = Router();

// Get cart by session ID
router.get('/:sessionId', optionalAuth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ sessionId: req.params.sessionId });
    if (!cart) {
      cart = await Cart.create({ 
        sessionId: req.params.sessionId, 
        items: [] 
      });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Sync cart (for logged-in users)
router.post('/sync', optionalAuth, async (req, res) => {
  try {
    const { sessionId, items } = req.body;
    
    let cart = await Cart.findOne({ sessionId });
    
    if (cart) {
      cart.items = items;
      cart.updatedAt = new Date();
      await cart.save();
    } else {
      cart = await Cart.create({ sessionId, items });
    }
    
    // If user is logged in, also save to user's cart
    if (req.user) {
      let userCart = await Cart.findOne({ user: req.user._id });
      if (userCart) {
        userCart.items = items;
        userCart.updatedAt = new Date();
        await userCart.save();
      } else {
        await Cart.create({ user: req.user._id, items, sessionId });
      }
    }
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;