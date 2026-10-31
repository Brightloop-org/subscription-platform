import cron from 'node-cron';
import Subscription from '../models/Subscription.js';
import Invoice from '../models/Invoice.js';

export const calculateNextDate = (currentDate, interval) => {
  const next = new Date(currentDate);
  switch (interval) {
    case 'daily':
      next.setDate(next.getDate() + 1);
      break;
    case 'weekly':
      next.setDate(next.getDate() + 7);
      break;
    case 'yearly':
      next.setFullYear(next.getFullYear() + 1);
      break;
    case 'monthly':
    default:
      next.setMonth(next.getMonth() + 1);
      break;
  }
  return next;
};

export const runBillingCycle = async () => {
  console.log('[BillingEngine] Starting recurring billing run...');
  const now = new Date();

  try {
    const dueSubscriptions = await Subscription.find({
      status: 'Active',
      nextBillingDate: { $lte: now }
    }).populate('customer plan lines.product appliedDiscount');

    let generatedInvoicesCount = 0;

    for (const sub of dueSubscriptions) {
      const billingCycleStr = sub.nextBillingDate.toISOString().split('T')[0];
      const billingRunKey = `sub_${sub._id}_${billingCycleStr}`;

      const existingInvoice = await Invoice.findOne({ billingRunKey });
      if (existingInvoice) continue;

      let subtotal = 0;
      let taxTotal = 0;

      const invoiceLines = sub.lines.map(line => {
        const unitPriceWithVariant = line.unitPrice + (line.variantPriceDelta || 0);
        const lineAmount = unitPriceWithVariant * line.quantity;
        const lineTax = (lineAmount * (line.taxRate || 0)) / 100;

        subtotal += lineAmount;
        taxTotal += lineTax;

        return {
          productName: line.product?.name || 'Subscription Line',
          variantName: line.variantName || '',
          quantity: line.quantity,
          unitPrice: unitPriceWithVariant,
          taxRate: line.taxRate || 0,
          taxAmount: lineTax,
          amount: lineAmount
        };
      });

      let discountTotal = 0;
      if (sub.appliedDiscount && sub.appliedDiscount.isActive) {
        if (sub.appliedDiscount.type === 'percentage') {
          discountTotal = (subtotal * sub.appliedDiscount.value) / 100;
        } else {
          discountTotal = Math.min(subtotal, sub.appliedDiscount.value);
        }
      }

      const totalAmount = Math.max(0, subtotal - discountTotal + taxTotal);
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 15);

      const invoiceNumber = `INV-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;
      await Invoice.create({
        invoiceNumber,
        subscription: sub._id,
        customer: sub.customer._id,
        status: 'Draft',
        issueDate: now,
        dueDate,
        lines: invoiceLines,
        subtotal,
        taxTotal,
        discountTotal,
        totalAmount,
        amountPaid: 0,
        amountDue: totalAmount,
        billingRunKey
      });

      sub.nextBillingDate = calculateNextDate(sub.nextBillingDate, sub.plan.billingInterval);
      
      if (sub.plan.autoCloseAtEnd && sub.expiryDate && sub.nextBillingDate >= sub.expiryDate) {
        sub.status = 'Closed';
      }

      await sub.save();
      generatedInvoicesCount++;
    }

    console.log(`[BillingEngine] Billing run complete. ${generatedInvoicesCount} invoices generated.`);
  } catch (error) {
    console.error('[BillingEngine] Error executing billing run:', error.message);
  }
};

export const startBillingCron = () => {
  cron.schedule('0 0 * * *', () => {
    runBillingCycle();
  });
  console.log('[BillingEngine] Cron scheduler started');
};
