import mongoose from 'mongoose';

const variantSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g. "Brand: Odoo" or "Tier: Pro"
  priceDelta: { type: Number, default: 0 } // e.g. +560
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['service', 'subscription', 'consumable'],
    default: 'subscription'
  },
  salesPrice: {
    type: Number,
    required: true,
    min: 0
  },
  costPrice: {
    type: Number,
    default: 0,
    min: 0
  },
  notes: {
    type: String,
    default: ''
  },
  variants: [variantSchema]
}, { timestamps: true });

export default mongoose.model('Product', productSchema);

