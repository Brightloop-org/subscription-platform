import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  invoice: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Invoice',
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  method: {
    type: String,
    enum: ['Bank Transfer', 'Credit Card', 'Cash', 'Stripe Mock'],
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0.01
  },
  paymentDate: {
    type: Date,
    default: Date.now
  },
  note: {
    type: String,
    default: ''
  }
}, { timestamps: true });

export default mongoose.model('Payment', paymentSchema);

