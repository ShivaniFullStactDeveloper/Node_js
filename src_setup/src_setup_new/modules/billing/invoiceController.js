const invoiceService = require('./invoiceService');

// Generate Invoice
exports.generateInvoice = async (req, res) => {
  try {
    const { institution_id, subscription_id } = req.body;

    const invoice = await invoiceService.generateInvoiceForSubscription({
      institutionId: institution_id,
      subscriptionId: subscription_id
    });

    res.status(201).json({
      success: true,
      data: invoice
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};
