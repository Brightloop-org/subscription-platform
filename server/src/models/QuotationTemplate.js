import mongoose from 'mongoose';

const templateLineSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  variantName: { type: String, default: '' },
  variantPriceDelta: { type: Number, default: 0 },
  quantity: { type: Number, default: 1, min: 1 },
  unitPrice: { type: Number, required: true }
});

const quotationTemplateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plan',
    required: true
  },
  validityDays: {
    type: Number,
    default: 30,
    min: 1
  },
  lines: [templateLineSchema]
}, { timestamps: true });

export default mongoose.model('QuotationTemplate', quotationTemplateSchema);

