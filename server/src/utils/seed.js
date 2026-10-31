import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/subscription_platform';

const seedUsers = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected for seeding...');

    // Clear existing users
    await User.deleteMany({});
    console.log('Cleared existing users collection.');

    const users = [
      {
        name: 'System Administrator',
        email: 'admin@brightloop.com',
        password: 'Admin@12345',
        role: 'admin'
      },
      {
        name: 'Alex Staff',
        email: 'staff@brightloop.com',
        password: 'Staff@12345',
        role: 'staff'
      },
      {
        name: 'Acme Retail Customer',
        email: 'customer@brightloop.com',
        password: 'Customer@12345',
        role: 'customer'
      }
    ];

    for (const u of users) {
      await User.create(u);
      console.log(`Seeded ${u.role}: ${u.email} (Password: ${u.password})`);
    }

    console.log('✅ Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedUsers();

