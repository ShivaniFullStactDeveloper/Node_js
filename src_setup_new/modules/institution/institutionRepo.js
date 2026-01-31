// const db = require('../../config/database');

// exports.insertInstitution = async (data) => {
//   const q = `
//     INSERT INTO institution
//     (id, tenant_id, institution_type, name, legal_name,
//      grade_range, boarding_flag, status, created_at, created_by)
//     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,NOW())
//   `;

//   await db.query(q, [
//     data.id,
//     data.tenant_id,
//     data.institution_type,
//     data.name,
//     data.legal_name,
//     data.grade_range,
//     data.boarding_flag,
//     data.status,
//     data.created_by
//   ]);
// };

// exports.insertInstitutionProfile = async (data) => {
//   const q = `
//     INSERT INTO institution_profile
//     (institution_id, display_name, updated_at)
//     VALUES ($1,$2,NOW())
//   `;
//   await db.query(q, [
//     data.institution_id,
//     data.display_name
//   ]);
// };


// // institution domain 
// // check institution
// exports.findInstitutionById = async (id) => {
//   const { rows } = await db.query(
//     'SELECT id FROM institution WHERE id = $1',
//     [id]
//   );
//   return rows[0];
// };

// // unset old primary
// exports.clearPrimaryDomain = async (institutionId) => {
//   await db.query(
//     `UPDATE institution_domain
//      SET is_primary = false
//      WHERE institution_id = $1`,
//     [institutionId]
//   );
// };

// // insert domain
// exports.insertInstitutionDomain = async (data) => {
//   await db.query(
//     `INSERT INTO institution_domain
//      (id, institution_id, domain, is_primary, verification_status, created_at)
//      VALUES ($1,$2,$3,$4,$5, now())`,
//     [
//       data.id,
//       data.institution_id,
//       data.domain,
//       data.is_primary,
//       data.verification_status
//     ]
//   );
// };


// // find domain
// exports.findDomainById = async (id) => {
//   const { rows } = await db.query(
//     'SELECT * FROM institution_domain WHERE id = $1',
//     [id]
//   );
//   return rows[0];
// };

// // verify domain
// exports.markDomainVerified = async ({ id, verification_method }) => {
//   await db.query(
//     `UPDATE institution_domain
//      SET verification_status = 'verified',
//          verification_method = $2,
//          verified_at = now()
//      WHERE id = $1`,
//     [id, verification_method]
//   );
// };

// // get institution modules
// exports.getInstitutionModules = async (institution_id) => {
//   const res = await db.query(
//     `
//     SELECT 
//       mc.module_key,
//       mc.name,
//       me.is_enabled
//     FROM module_enablement me
//     JOIN module_catalog mc
//       ON mc.module_key = me.module_key
//     WHERE me.institution_id = $1
//     ORDER BY mc.module_key
//     `,
//     [institution_id]
//   );

//   return res.rows;
// };


const db = require('../../config/database');

// ----------------------------
// Institution
// ----------------------------
exports.insertInstitution = async (i) => {
  await db.query(
    `
    INSERT INTO institution (
      id, tenant_id, institution_type, name, legal_name,
      grade_range, boarding_flag, status, created_by, created_at
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,now())
    `,
    [
      i.id,
      i.tenant_id,
      i.institution_type,
      i.name,
      i.legal_name,
      i.grade_range,
      i.boarding_flag,
      i.status,
      i.created_by
    ]
  );
};

// ----------------------------
// DEFAULT MODULES ⭐⭐⭐
// ----------------------------
exports.insertDefaultModules = async ({ institution_id, institution_type }) => {
  await db.query(
    `
    INSERT INTO module_enablement (institution_id, module_key, is_enabled)
    SELECT
      $1,
      module_key,
      is_required
    FROM module_default_by_type
    WHERE institution_type = $2
    `,
    [institution_id, institution_type]
  );
};

// ----------------------------
// Domains
// ----------------------------
exports.insertInstitutionDomain = async (d) => {
  await db.query(
    `
    INSERT INTO institution_domain
    (id, institution_id, domain, verification_status, is_primary, created_at)
    VALUES ($1,$2,$3,$4,$5,now())
    `,
    [
      d.id,
      d.institution_id,
      d.domain,
      d.verification_status,
      d.is_primary
    ]
  );
};

exports.verifyInstitutionDomain = async ({ institution_domain_id, verification_method }) => {
  await db.query(
    `
    UPDATE institution_domain
    SET verification_status = 'active',
        verification_method = $2,
        verified_at = now()
    WHERE id = $1
    `,
    [institution_domain_id, verification_method]
  );
};

// ----------------------------
// Modules
// ----------------------------
exports.getInstitutionModules = async (institutionId) => {
  const { rows } = await db.query(
    `
    SELECT
      mc.module_key,
      mc.name,
      me.is_enabled
    FROM module_enablement me
    JOIN module_catalog mc ON mc.module_key = me.module_key
    WHERE me.institution_id = $1
    ORDER BY mc.module_key
    `,
    [institutionId]
  );
  return rows;
};

// ----------------------------
// Get Institution by ID
// ----------------------------
exports.getById = async (institutionId) => {
  const { rows } = await db.query(
    `SELECT * FROM institution WHERE id = $1`,
    [institutionId]
  );

  return rows[0]; // undefined if not found
};

// exports.getById = async (id) => {
//   const { rows } = await db.query(
//     `SELECT * FROM institution WHERE id = $1`,
//     [id]
//   );
//   return rows[0];
// };