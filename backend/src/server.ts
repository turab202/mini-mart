import express, { Request } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import dotenv from "dotenv";
dotenv.config();

import authRoutes from './routes/auth';
import productRoutes from './routes/products';
import orderRoutes from './routes/orders';
import cartRoutes from './routes/cart';

const app = express();
app.use(cors({
  origin: [
    'http://localhost:4200',
    /\.onrender\.com$/,
    /\.netlify\.app$/,
    /\.vercel\.app$/
  ],
  credentials: true
}));
app.use(express.json());

// ✅ FIX: Extend Request type for multer
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

// Create uploads directory if it doesn't exist
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only images are allowed'));
    }
  }
});

// Upload endpoint
app.post('/api/upload', upload.single('image'), (req: MulterRequest, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const baseUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`;
    const imageUrl = `${baseUrl}/uploads/${req.file.filename}`;

    res.json({ imageUrl });
  } catch (error) {
    res.status(500).json({ message: 'Upload failed' });
  }
});

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health check
app.get('/health', (req, res) => {
  const dbState = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  const uri = process.env.MONGODB_URI || '';
  // Show full URI with password masked for debugging
  const maskedUri = uri.replace(/:([^@]+)@/, ':****@');
  res.json({
    status: 'ok',
    db: dbState[mongoose.connection.readyState],
    uri: maskedUri,
    env: {
      hasMongoUri: !!process.env.MONGODB_URI,
      hasJwtSecret: !!process.env.JWT_SECRET,
      port: process.env.PORT || 5000
    }
  });
});

// ==============================================
// TEMPORARY SEED ENDPOINT - REMOVE AFTER USING!
// ==============================================
app.post('/api/admin/seed', async (req, res) => {
  try {
    // IMPORTANT: Use the existing Product model (already compiled by productRoutes)
    // This prevents the "OverwriteModelError" error
    const Product = mongoose.model('Product');
    
    // Your 20 products data
    const products = [
      { name: "Sony WH-1000XM5 Wireless Headphones", description: "Industry-leading noise cancellation with exceptional sound quality. 30-hour battery life and comfortable design.", price: 24999, category: "Electronics", stock: 15, isFeatured: true, images: ["https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400"] },
      { name: "Apple AirPods Pro 2nd Gen", description: "Active noise cancellation, transparency mode, spatial audio, and up to 6 hours of battery life.", price: 18499, category: "Electronics", stock: 25, isFeatured: true, images: ["https://images.unsplash.com/photo-1600294037681-c80b4e9b1f6e?w=400"] },
      { name: "Samsung 55\" 4K Smart TV", description: "Crystal clear 4K resolution with HDR, smart TV capabilities, and built-in streaming apps.", price: 49999, category: "Electronics", stock: 8, isFeatured: true, images: ["https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400"] },
      { name: "iPad 10th Generation", description: "10.9-inch Liquid Retina display, A14 Bionic chip, and all-day battery life.", price: 32999, category: "Electronics", stock: 12, isFeatured: false, images: ["https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400"] },
      { name: "JBL Flip 6 Bluetooth Speaker", description: "Portable waterproof speaker with powerful sound and 12 hours of playtime.", price: 7499, category: "Electronics", stock: 40, isFeatured: true, images: ["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400"] },
      { name: "Nike Air Max 90 Shoes", description: "Iconic running shoes with visible Air cushioning and durable rubber sole.", price: 8999, category: "Clothing", stock: 35, isFeatured: true, images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"] },
      { name: "Adidas Originals Hoodie", description: "Soft cotton-blend hoodie with adjustable drawstring hood and kangaroo pocket.", price: 4499, category: "Clothing", stock: 50, isFeatured: true, images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400"] },
      { name: "Levi's 501 Original Jeans", description: "Classic straight-fit jeans with button fly and 5-pocket styling.", price: 3999, category: "Clothing", stock: 60, isFeatured: false, images: ["https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400"] },
      { name: "The North Face Puffer Jacket", description: "Warm insulated jacket with water-resistant shell and packable design.", price: 12999, category: "Clothing", stock: 20, isFeatured: true, images: ["https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=400"] },
      { name: "Ray-Ban Classic Sunglasses", description: "Iconic aviator sunglasses with UV protection and metal frame.", price: 5499, category: "Clothing", stock: 45, isFeatured: false, images: ["https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400"] },
      { name: "Dyson V15 Vacuum Cleaner", description: "Powerful cordless vacuum with laser detection and LCD screen.", price: 42999, category: "Home & Living", stock: 10, isFeatured: true, images: ["https://images.unsplash.com/photo-1558317374-687fb8cf1b0b?w=400"] },
      { name: "Instant Pot Duo 7-in-1", description: "Multi-functional pressure cooker, slow cooker, rice cooker, and more.", price: 8999, category: "Home & Living", stock: 30, isFeatured: true, images: ["https://images.unsplash.com/photo-1585515320310-259814833e62?w=400"] },
      { name: "Casper Memory Foam Pillow", description: "Ergonomic pillow with breathable cover and adaptive foam.", price: 2499, category: "Home & Living", stock: 100, isFeatured: false, images: ["https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400"] },
      { name: "Philips Hue Smart Bulbs (4-pack)", description: "Color-changing smart bulbs compatible with Alexa and Google Home.", price: 6499, category: "Home & Living", stock: 25, isFeatured: true, images: ["https://images.unsplash.com/photo-1550985616-10810253b84d?w=400"] },
      { name: "KitchenAid Stand Mixer", description: "Professional-grade mixer with 10 speeds and multiple attachments.", price: 35999, category: "Home & Living", stock: 8, isFeatured: false, images: ["https://images.unsplash.com/photo-1584985974423-94d3c69aace9?w=400"] },
      { name: "Dyson Airwrap Styler", description: "Multi-styler that curls, waves, smooths, and dries without extreme heat.", price: 54999, category: "Beauty", stock: 5, isFeatured: true, images: ["https://images.unsplash.com/photo-1671571908960-2b7d5a9a1b6f?w=400"] },
      { name: "The Ordinary Skincare Set", description: "Complete skincare routine with cleanser, serums, and moisturizer.", price: 3499, category: "Beauty", stock: 80, isFeatured: true, images: ["https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400"] },
      { name: "Channel No.5 Perfume", description: "Iconic floral-aldehyde fragrance with timeless elegance.", price: 15999, category: "Beauty", stock: 20, isFeatured: false, images: ["https://images.unsplash.com/photo-1541643600914-78b084683601?w=400"] },
      { name: "Philips Sonicare Toothbrush", description: "Electric toothbrush with sonic technology and pressure sensor.", price: 7999, category: "Beauty", stock: 35, isFeatured: true, images: ["https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400"] },
      { name: "Neutrogena Sunscreen SPF 50", description: "Broad spectrum sunscreen with helioplex technology.", price: 1299, category: "Beauty", stock: 150, isFeatured: false, images: ["https://images.unsplash.com/photo-1556229174-5e42a9e4f81f?w=400"] }
    ];

    // Clear existing products
    const deleted = await Product.deleteMany({});
    console.log(`🗑️ Deleted ${deleted.deletedCount} existing products`);

    // Insert new products
    const inserted = await Product.insertMany(products);
    
    console.log(`✅ Seeded ${inserted.length} products successfully!`);
    
    res.json({ 
      success: true, 
      message: `Successfully seeded ${inserted.length} products!`,
      count: inserted.length,
      products: inserted.map(p => ({ 
        id: p._id,
        name: p.name, 
        category: p.category, 
        price: p.price,
        stock: p.stock
      }))
    });
    
  } catch (error: any) {
    console.error('❌ Seed error:', error.message);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// ==============================================
// TEMPORARY ADMIN ROLE UPDATE ENDPOINT
// ==============================================
app.post('/api/admin/set-role', async (req, res) => {
  try {
    const { email, role } = req.body;
    
    // Validate inputs
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        error: 'Email is required' 
      });
    }
    
    if (!role || !['admin', 'user'].includes(role)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Role must be either "admin" or "user"' 
      });
    }
    
    // Get the User model (assuming you have one from auth routes)
    const User = mongoose.model('User');
    
    // Update user role
    const result = await User.updateOne(
      { email: email },
      { $set: { role: role } }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ 
        success: false, 
        error: `User with email ${email} not found` 
      });
    }
    
    if (result.modifiedCount > 0) {
      console.log(`✅ Updated ${email} to role: ${role}`);
      res.json({ 
        success: true, 
        message: `Successfully updated ${email} to ${role} role`,
        email: email,
        role: role
      });
    } else {
      res.json({ 
        success: true, 
        message: `User ${email} already has ${role} role`,
        email: email,
        role: role
      });
    }
    
  } catch (error: any) {
    console.error('❌ Role update error:', error.message);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// ==============================================
// GET USER INFO ENDPOINT (to check roles)
// ==============================================
app.get('/api/admin/user/:email', async (req, res) => {
  try {
    const User = mongoose.model('User');
    const user = await User.findOne({ email: req.params.email });
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        error: 'User not found' 
      });
    }
    
    res.json({
      success: true,
      user: {
        email: user.email,
        name: user.name,
        role: user.role,
        phone: user.phone
      }
    });
    
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});
// ==============================================
// END OF ADMIN ENDPOINTS
// ==============================================

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);

// CONNECT DB + START SERVER
const startServer = async () => {
  try {
    const uri = process.env.MONGODB_URI as string;

    if (!uri) {
      throw new Error('MONGODB_URI is not set!');
    }

    console.log('Connecting to MongoDB...');

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 45000,
    });

    console.log('MongoDB Connected ✅');

    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000} 🚀`);
    });

  } catch (error: any) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

startServer();