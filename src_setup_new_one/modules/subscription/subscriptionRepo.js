// const db = require('../../config/database');

// exports.createSubscription = async ({
//   tenantId,
//   planId,
//   startsAt,
//   endsAt
// }) => {
//   const { rows } = await db.query(
//     `
//     INSERT INTO subscription
//       (id, tenant_id, plan_id, status, starts_at, ends_at)
//     VALUES
//       (gen_random_uuid(), $1, $2, 'active', $3, $4)
//     RETURNING *
//     `,
//     [tenantId, planId, startsAt, endsAt]
//   );

//   return rows[0];
// };

// exports.getPlanById = async (planId) => {
//   const { rows } = await db.query(
//     `SELECT * FROM subscription_plan_template WHERE id = $1 AND status = 'active'`,
//     [planId]
//   );
//   return rows[0];
// };


const db = require('../../config/database');

exports.getInstitutionById = async (institutionId) => {
  const { rows } = await db.query(
    `SELECT id, tenant_id FROM institution WHERE id = $1`,
    [institutionId]
  );
  return rows[0];
};

exports.getPlanById = async (planId) => {
  const { rows } = await db.query(
    `SELECT id, billing_cycle FROM subscription_plan_template WHERE id = $1 AND status = 'active'`,
    [planId]
  );
  return rows[0];
};

exports.createSubscription = async ({
  tenant_id,
  plan_id,
  starts_at,
  ends_at
}) => {
  const { rows } = await db.query(
    `
    INSERT INTO subscription (
      id,
      tenant_id,
      plan_id,
      status,
      starts_at,
      ends_at
    )
    VALUES (gen_random_uuid(), $1, $2, 'active', $3, $4)
    RETURNING *
    `,
    [tenant_id, plan_id, starts_at, ends_at]
  );

  return rows[0];
};


// ------------------------------
// Get subscription by ID
// ------------------------------
exports.getById = async (subscriptionId) => {
  const { rows } = await db.query(
    `
    SELECT *
    FROM subscription
    WHERE id = $1
    `,
    [subscriptionId]
  );

  return rows[0];
};