const db = require('../../config/database');

exports.getDefaultsByInstitutionType = async (institutionType) => {
  const { rows } = await db.query(
    `SELECT * FROM terminology_default
     WHERE institution_type = $1`,
    [institutionType]
  );
  return rows;
};

exports.insertOverride = async ({
  tenant_id,
  institution_id,
  term_id,
  language_code,
  label
}) => {
  await db.query(
    `
    INSERT INTO terminology_override
    (tenant_id, institution_id, term_id, language_code, label)
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT DO NOTHING
    `,
    [tenant_id, institution_id, term_id, language_code, label]
  );
};


exports.getOverridesByInstitution = async (institutionId) => {
  const { rows } = await db.query(
    `SELECT tt.term_key, tovr.language_code, tovr.label
     FROM terminology_override tovr
     JOIN terminology_term tt ON tt.id = tovr.term_id
     WHERE tovr.institution_id = $1`,
    [institutionId]
  );
  return rows;
};

//  Get terminology overrides by tenant_id and institution_id
exports.getByInstitutionId = async (tenantId, institutionId) => {
  const { rows } = await db.query(
    `
    SELECT
      t.term_key,
      o.language_code,
      o.label
    FROM terminology_override o
    JOIN terminology_term t ON t.id = o.term_id
    WHERE o.tenant_id = $1
      AND o.institution_id = $2
    ORDER BY t.term_key
    `,
    [tenantId, institutionId]
  );

  return rows;
};
