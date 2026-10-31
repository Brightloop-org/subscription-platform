import mongoose from 'mongoose';

const taxSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  ratePercentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  isDefault: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export default mongoose.model('Tax', taxSchema);

