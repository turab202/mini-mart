import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  role: String
});

const User = mongoose.model('User', userSchema);

const updateAdminRole = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mini-mart');
    console.log('Connected to MongoDB');

    const result = await User.updateOne(
      { email: 'admin@minimart.com' },
      { $set: { role: 'admin' } }
    );

    if (result.modifiedCount > 0) {
      console.log('✅ Admin role updated successfully!');
    } else {
      console.log('User not found or role already set');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

updateAdminRole();
