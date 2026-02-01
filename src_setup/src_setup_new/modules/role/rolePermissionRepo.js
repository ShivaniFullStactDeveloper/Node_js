const db = require('../../config/database');

exports.attachModuleAccess = async (roleId, modules) => {
    for (const mod of modules) {
      await db.query(
        `
        INSERT INTO role_module_access (
          role_id, module_key, allow_mask, deny_mask
        )
        VALUES ($1, $2, 255, 0)
        ON CONFLICT (role_id, module_key) DO NOTHING
        `,
        [roleId, mod.module_key]
      );
    }
  };
  