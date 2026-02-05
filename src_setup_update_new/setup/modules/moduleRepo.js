const db = require("../../config/database");

// ---------- MODULE MASTER ---------- 
exports.insertModule = async (client, data) => {
  const { rows } = await client.query(
    `
    INSERT INTO modules
    (module_code, name, short_description, description)
    VALUES ($1,$2,$3,$4)
    RETURNING *
    `,
    [
      data.module_code,
      data.name,
      data.short_description,
      data.description
    ]
  );
  return rows[0];
};

// ---------- INSTITUTE RULES ---------- 
exports.insertInstituteConfig = async (client, moduleId, cfg) => {
  await client.query(
    `
    INSERT INTO module_institute_config
    (module_id, institute_type, lock_mode, is_required)
    VALUES ($1,$2,$3,$4)
    `,
    [
      moduleId,
      cfg.institute_type,
      cfg.lock_mode,
      cfg.is_required || false
    ]
  );
};

// ---------- STEP-4 GET ---------- 
exports.getModulesForInstitution = async (
  institutionId,
  instituteType
) => {
  const { rows } = await db.query(
    `
    SELECT
      m.id AS module_id,
      m.name,
      mic.lock_mode,
      mic.is_required,
      COALESCE(im.is_enabled, false) AS is_enabled
    FROM modules m
    JOIN module_institute_config mic
      ON mic.module_id = m.id
    LEFT JOIN institution_modules im
      ON im.module_id = m.id
     AND im.institution_id = $1
    WHERE mic.institute_type = $2
      AND m.status = 'active'
    `,
    [institutionId, instituteType]
  );
  return rows;
};

/* ---------- STEP-4 SAVE ---------- */
// exports.clearOptionalModules = async (client, institutionId) => {
//   await client.query(
//     `
//     DELETE FROM institution_modules im
//     USING module_institute_config mic
//     WHERE im.module_id = mic.module_id
//       AND im.institution_id = $1
//       AND mic.is_required = false
//     `,
//     [institutionId]
//   );
// };

// exports.upsertInstitutionModule = async (
//   client,
//   institutionId,
//   m
// ) => {
//   await client.query(
//     `
//     INSERT INTO institution_modules
//     (institution_id, module_id, is_enabled)
//     VALUES ($1,$2,$3)
//     ON CONFLICT (institution_id, module_id)
//     DO UPDATE SET is_enabled = EXCLUDED.is_enabled
//     `,
//     [institutionId, m.module_id, m.is_enabled]
//   );
// };
