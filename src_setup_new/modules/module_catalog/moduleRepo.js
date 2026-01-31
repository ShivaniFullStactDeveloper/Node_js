const db = require('../../config/database');

exports.getDefaultModulesByInstitutionType = async (institution_type) => {
  const res = await db.query(
    `
    SELECT module_key, is_required
    FROM module_default_by_type
    WHERE institution_type = $1
    `,
    [institution_type]
  );

  return res.rows;
};

// enable modules for institution
exports.enableModulesForInstitution = async (
    institution_id,
    modules
  ) => {
    if (!modules.length) return;
  
    const values = [];
    const params = [];
  
    modules.forEach((m, i) => {
      const idx = i * 3;
      values.push(`($${idx + 1}, $${idx + 2}, $${idx + 3})`);
      params.push(institution_id, m.module_key, true);
    });
  
    const query = `
      INSERT INTO module_enablement (
        institution_id,
        module_key,
        is_enabled
      )
      VALUES ${values.join(',')}
      ON CONFLICT (institution_id, module_key)
      DO NOTHING
    `;
  
    await db.query(query, params);
  };
  