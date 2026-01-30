const db = require('../../config/database');

exports.insertTenant = async (t) => {
  const q = `
    INSERT INTO tenant
    (id, tenant_kind, name, status, default_language, created_at)
    VALUES ($1, $2, $3, $4, $5, NOW())
  `;
  await db.query(q, [
    t.id, t.tenant_kind, t.name, t.status, t.default_language
  ]);
};

exports.insertUser = async (u) => {
  const q = `
    INSERT INTO "user"
    (id, email, password_hash, status, created_at)
    VALUES ($1, $2, $3, $4, NOW())
  `;
  await db.query(q, [
    u.id, u.email, u.password_hash, u.status
  ]);
};

exports.insertTenantUser = async (tu) => {
  const q = `
    INSERT INTO tenant_user
    (tenant_id, user_id, is_owner, status, created_at)
    VALUES ($1, $2, $3, $4, NOW())
  `;
  await db.query(q, [
    tu.tenant_id, tu.user_id, tu.is_owner, tu.status
  ]);
};

exports.insertOnboardingSession = async ({ tenant_id, status }) => {
  const q = `
    INSERT INTO onboarding_session
    (id, tenant_id, status, started_at)
    VALUES (uuid_generate_v4(), $1, $2, NOW())
  `;
  await db.query(q, [tenant_id, status]);
};


// TENANT get 
exports.getTenantById = async (tenantId) => {
  const res = await db.query(
    'SELECT * FROM tenant WHERE id = $1',
    [tenantId]
  );
  return res.rows[0];
};
// // TENANT update primary institution
exports.updateTenantPrimaryInstitution = async (tenantId, institutionId) => {
  await db.query(
    `UPDATE tenant
     SET primary_institution_id = $1
     WHERE id = $2`,
    [institutionId, tenantId]
  );
};

// // ============================================================
// // INSTITUTION
// exports.createInstitution = async (data) => {
//   const {
//     id,
//     tenant_id,
//     institution_type,
//     name,
//     legal_name,
//     grade_range,
//     boarding_flag,
//     status,
//     created_by
//   } = data;

//   await db.query(
//     `INSERT INTO institution
//      (id, tenant_id, institution_type, name, legal_name,
//       grade_range, boarding_flag, status, created_at, created_by)
//      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,NOW(),$9)`,
//     [
//       id,
//       tenant_id,
//       institution_type,
//       name,
//       legal_name,
//       grade_range,
//       boarding_flag,
//       status,
//       created_by
//     ]
//   );
// };

// exports.createInstitutionProfile = async (data) => {
//   await db.query(
//     `INSERT INTO institution_profile
//      (institution_id, display_name, updated_at)
//      VALUES ($1,$2,NOW())`,
//     [data.institution_id, data.display_name]
//   );
// };

// exports.updateTenantPrimaryInstitution = async (tenantId, institutionId) => {
//   await db.query(
//     `UPDATE tenant
//      SET primary_institution_id = $1
//      WHERE id = $2`,
//     [institutionId, tenantId]
//   );
// };

// src/modules/setup/setupRepo.js

// exports.findActiveOnboarding = async (tenantId) => {
//   const { rows } = await db.query(
//     `SELECT * FROM onboarding_session
//      WHERE tenant_id = $1
//      AND status IN ('not_started', 'in_progress')
//      LIMIT 1`,
//     [tenantId]
//   );
//   return rows[0];
// };

// exports.createOnboardingSession = async ({
//   tenantId,
//   institutionId,
//   startedBy
// }) => {
//   const { rows } = await db.query(
//     `INSERT INTO onboarding_session
//      (id, tenant_id, institution_id, status, started_at)
//      VALUES (gen_random_uuid(), $1, $2, 'in_progress', now())
//      RETURNING *`,
//     [tenantId, institutionId]
//   );
//   return rows[0];
// };

// exports.createFirstStep = async (sessionId) => {
//   await db.query(
//     `INSERT INTO onboarding_step_progress
//      (id, onboarding_session_id, step_key, state)
//      VALUES (gen_random_uuid(), $1, 'school_info', 'pending')`,
//     [sessionId]
//   );
// };


// updated code with institutionId in findActiveOnboarding
exports.findActiveOnboarding = async (tenantId, institutionId) => {
  const { rows } = await db.query(
    `
    SELECT *
    FROM onboarding_session
    WHERE tenant_id = $1
      AND institution_id = $2
      AND status IN ('not_started', 'in_progress')
    LIMIT 1
    `,
    [tenantId, institutionId]
  );
  return rows[0];
};

exports.createOnboardingSession = async ({
  tenantId,
  institutionId,
  startedBy
}) => {
  const { rows } = await db.query(
    `
    INSERT INTO onboarding_session
      (id, tenant_id, institution_id, status, started_by, started_at)
    VALUES
      (gen_random_uuid(), $1, $2, 'in_progress', $3, now())
    RETURNING *
    `,
    [tenantId, institutionId, startedBy]
  );
  return rows[0];
};

// ============================================================
// TENANT GET BY ID
exports.getById = async (tenantId) => {
  const { rows } = await db.query(
    `SELECT * FROM tenant WHERE id = $1`,
    [tenantId]
  );

  return rows[0]; // undefined if not found
};