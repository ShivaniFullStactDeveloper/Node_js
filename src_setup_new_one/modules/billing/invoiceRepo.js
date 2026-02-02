const db = require('../../config/database');

// ----------------------------------
// Create Invoice
// ----------------------------------
exports.createInvoice = async ({
  subscriptionId,
  totalAmount,
  status = 'issued'
}) => {
  const { rows } = await db.query(
    `
    INSERT INTO invoice (
      subscription_id,
      total_amount,
      status,
      issued_at
    )
    VALUES ($1, $2, $3, now())
    RETURNING *
    `,
    [subscriptionId, totalAmount, status]
  );

  return rows[0];
};

// ----------------------------------
// Add Invoice Line Item
// ----------------------------------
exports.addInvoiceLineItem = async ({
  invoiceId,
  description,
  amount
}) => {
  const { rows } = await db.query(
    `
    INSERT INTO invoice_line_item (
      invoice_id,
      description,
      amount
    )
    VALUES ($1, $2, $3)
    RETURNING *
    `,
    [invoiceId, description, amount]
  );

  return rows[0];
};

// ----------------------------------
// Get Invoice by Subscription
// ----------------------------------
exports.getInvoiceBySubscription = async (subscriptionId) => {
  const { rows } = await db.query(
    `
    SELECT *
    FROM invoice
    WHERE subscription_id = $1
    ORDER BY issued_at DESC
    LIMIT 1
    `,
    [subscriptionId]
  );

  return rows[0];
};
