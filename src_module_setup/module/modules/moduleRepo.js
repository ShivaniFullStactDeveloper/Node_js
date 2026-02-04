/**
 * Repo = sirf database logic
 */

const db = require("../../config/db");

// S4
exports.createModule = async (key, name, status) => {
  await db.query(
    `INSERT INTO module_catalog (module_key, display_name, status)
     VALUES ($1,$2,$3)`,
    [key, name, status]
  );
  return { message: "Module created" };
};

// S5
exports.assignDefault = async (type, key, status) => {
  await db.query(
    `INSERT INTO module_default_by_type
     (id, institution_type, module_key, default_status)
     VALUES (gen_random_uuid(), $1,$2,$3)
     ON CONFLICT (institution_type, module_key) DO NOTHING`,
    [type, key, status]
  );
};

// S6
exports.getDefaults = async (type) => {
  const { rows } = await db.query(
    `
    SELECT m.module_key, m.display_name, d.default_status
    FROM module_default_by_type d
    JOIN module_catalog m ON m.module_key = d.module_key
    WHERE d.institution_type = $1
    `,
    [type]
  );
  return rows;
};

// S7
exports.copyDefaultsToInstitution = async (instId, type) => {
  await db.query(
    `
    INSERT INTO module_enablement
    (id, institution_id, module_key, is_enabled, is_locked)
    SELECT
      gen_random_uuid(),
      $1,
      module_key,
      default_status <> 'hidden',
      default_status = 'locked_required'
    FROM module_default_by_type
    WHERE institution_type = $2
    `,
    [instId, type]
  );
};

// S8
exports.toggleModule = async (instId, key, enabled) => {
  const result = await db.query(
    `
    UPDATE module_enablement
    SET is_enabled = $1
    WHERE institution_id = $2
      AND module_key = $3
      AND is_locked = false
    `,
    [enabled, instId, key]
  );

  if (result.rowCount === 0) {
    throw new Error("Module is locked or not found");
  }
};
