"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const Product_1 = __importDefault(require("./models/Product"));
dotenv_1.default.config();
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
async function seedDatabase() {
    try {
        // Connect to MongoDB
        const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mini-mart';
        await mongoose_1.default.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');
        // Clear existing products (optional - comment out if you want to keep existing)
        await Product_1.default.deleteMany({});
        console.log('🗑️  Cleared existing products');
        // Insert new products
        const inserted = await Product_1.default.insertMany(products);
        console.log(`✅ Added ${inserted.length} products successfully!`);
        // List all added products
        console.log('\n📦 Products added:');
        inserted.forEach(p => {
            console.log(`   - ${p.name} (${p.category}) - ${p.price} ETB`);
        });
        process.exit(0);
    }
    catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
