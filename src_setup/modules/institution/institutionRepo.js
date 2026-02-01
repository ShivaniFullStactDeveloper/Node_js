const db = require('../../config/database');

exports.insertInstitution = async (data) => {
  const q = `
    INSERT INTO institution
    (id, tenant_id, institution_type, name, legal_name,
     grade_range, boarding_flag, status, created_at, created_by)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,NOW())
  `;

  await db.query(q, [
    data.id,
    data.tenant_id,
    data.institution_type,
    data.name,
    data.legal_name,
    data.grade_range,
    data.boarding_flag,
    data.status,
    data.created_by
  ]);
};

exports.insertInstitutionProfile = async (data) => {
  const q = `
    INSERT INTO institution_profile
    (institution_id, display_name, updated_at)
    VALUES ($1,$2,NOW())
  `;
  await db.query(q, [
    data.institution_id,
    data.display_name
  ]);
};
