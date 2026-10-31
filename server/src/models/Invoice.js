import mongoose from 'mongoose';

const invoiceLineSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  variantName: { type: String, default: '' },
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  taxRate: { type: Number, default: 0 },
  taxAmount: { type: Number, default: 0 },
  amount: { type: Number, required: true }
});

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: {
    type: String,
    required: true,
    unique: true
  },
  subscription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subscription'
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['Draft', 'Confirmed', 'Paid', 'Cancelled'],
    default: 'Draft'
  },
  issueDate: {
    type: Date,
    default: Date.now
  },
  dueDate: {
    type: Date,
    required: true
  },
  lines: [invoiceLineSchema],
  subtotal: {
    type: Number,
    required: true,
    default: 0
  },
  taxTotal: {
    type: Number,
    default: 0
  },
  discountTotal: {
    type: Number,
    default: 0
  },
  totalAmount: {
    type: Number,
    required: true,
    default: 0
  },
  amountPaid: {
    type: Number,
    default: 0
  },
  amountDue: {
    type: Number,
    required: true
  },
  // Unique idempotency key to prevent double billing per subscription billing cycle
  billingRunKey: {
    type: String,
    sparse: true,
    unique: true
  }
}, { timestamps: true });

invoiceSchema.index({ customer: 1, status: 1 });
invoiceSchema.index({ dueDate: 1, status: 1 });

export default mongoose.model('Invoice', invoiceSchema);

