import mongoose from 'mongoose';

const subscriptionLineSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  variantName: { type: String, default: '' },
  variantPriceDelta: { type: Number, default: 0 },
  quantity: { type: Number, default: 1, min: 1 },
  unitPrice: { type: Number, required: true },
  taxRate: { type: Number, default: 0 },
  amount: { type: Number, required: true }
});

const subscriptionSchema = new mongoose.Schema({
  subscriptionNumber: {
    type: String,
    required: true,
    unique: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plan',
    required: true
  },
  status: {
    type: String,
    enum: ['Draft', 'Quotation', 'Confirmed', 'Active', 'Paused', 'Closed'],
    default: 'Draft'
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  expiryDate: {
    type: Date
  },
  nextBillingDate: {
    type: Date
  },
  paymentTerms: {
    type: String,
    default: 'Immediate Payment'
  },
  lines: [subscriptionLineSchema],
  appliedDiscount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Discount'
  },
  totalAmount: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

// Index for high performance query < 2s
subscriptionSchema.index({ customer: 1, status: 1 });
subscriptionSchema.index({ nextBillingDate: 1, status: 1 });

export default mongoose.model('Subscription', subscriptionSchema);

