import mongoose from 'mongoose';

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  billingInterval: {
    type: String,
    enum: ['daily', 'weekly', 'monthly', 'yearly'],
    default: 'monthly'
  },
  minQuantity: {
    type: Number,
    default: 1,
    min: 1
  },
  availableFrom: {
    type: Date,
    default: Date.now
  },
  availableTo: {
    type: Date
  },
  // Plan Lifecycle Policies
  autoCloseAtEnd: {
    type: Boolean,
    default: false
  },
  allowEarlyClose: {
    type: Boolean,
    default: true
  },
  allowPause: {
    type: Boolean,
    default: true
  },
  allowRenewal: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

export default mongoose.model('Plan', planSchema);

