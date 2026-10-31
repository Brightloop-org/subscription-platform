import mongoose from 'mongoose';

const discountSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true
  },
  type: {
    type: String,
    enum: ['fixed', 'percentage'],
    required: true
  },
  value: {
    type: Number,
    required: true,
    min: 0
  },
  minQuantity: {
    type: Number,
    default: 0
  },
  minAmount: {
    type: Number,
    default: 0
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date
  },
  usageLimit: {
    type: Number,
    default: null // null means unlimited
  },
  usedCount: {
    type: Number,
    default: 0
  },
  applyTo: {
    type: String,
    enum: ['whole', 'product'],
    default: 'whole'
  },
  applicableProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

export default mongoose.model('Discount', discountSchema);

