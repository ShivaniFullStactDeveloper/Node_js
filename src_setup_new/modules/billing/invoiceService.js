const invoiceRepo = require('./invoiceRepo');
const onboardingRepo = require('../onboarding/onboardingRepo');
const subscriptionRepo = require('../subscription/subscriptionRepo');

// ----------------------------------
// Generate Invoice for Subscription
// ----------------------------------
exports.generateInvoiceForSubscription = async ({
  institutionId,
  subscriptionId
}) => {
  const subscription = await subscriptionRepo.getById(subscriptionId);
  if (!subscription) {
    throw new Error('Subscription not found');
  }

  const amount = subscription.price || 0;

  // 1️⃣ Create invoice
  const invoice = await invoiceRepo.createInvoice({
    subscriptionId,
    totalAmount: amount,
    status: 'issued'
  });

  // 2️⃣ Line item
  await invoiceRepo.addInvoiceLineItem({
    invoiceId: invoice.id,
    description: 'Subscription Plan Charge',
    amount
  });

  // 3️⃣ Onboarding step complete
  await onboardingRepo.completeStep(institutionId, 'INVOICE');

  return invoice;
};
