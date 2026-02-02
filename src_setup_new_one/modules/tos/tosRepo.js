const db = require('../../config/database');

// get active tos
exports.getActiveTos = async () => {
  const { rows } = await db.query(
    `
    SELECT *
    FROM tos_document
    WHERE status = 'active'
    ORDER BY effective_from DESC
    LIMIT 1
    `
  );

  return rows[0];
};

// accept tos
exports.acceptTos = async ({ tosId, institutionId }) => {
  const { rows } = await db.query(
    `
    INSERT INTO tos_acceptance (
      tos_id,
      institution_id,
      signed_at
    )
    VALUES ($1, $2, now())
    RETURNING *
    `,
    [tosId, institutionId]
  );

  return rows[0];
};
