// src/module/modules/moduleRepo.js
module.exports = {
    createModule,
    assignInstituteType,
    assignToInstitution,
    getInstitutionModules,
    toggleModule,
    addPermission,
    getPermissions,
  };
  
  // 1. Create module
  async function createModule(db, data) {
    const { module_key, display_name, short_description, description } = data;
  
    await db.query(
      `
      INSERT INTO module_catalog (
        module_key, display_name, short_description, description
      )
      VALUES ($1,$2,$3,$4)
      `,
      [module_key, display_name, short_description, description]
    );
  }
  
  // 2. Assign institute types
  async function assignInstituteType(db, data) {
    const { institution_type, module_key, is_locked, can_enable } = data;
  
    await db.query(
      `
      INSERT INTO module_default_by_type (
        institution_type, module_key, is_locked, can_enable
      )
      VALUES ($1,$2,$3,$4)
      ON CONFLICT (institution_type, module_key)
      DO UPDATE SET
        is_locked = EXCLUDED.is_locked,
        can_enable = EXCLUDED.can_enable
      `,
      [institution_type, module_key, is_locked, can_enable]
    );
  }
  
  // 3. Assign module to institution
  async function assignToInstitution(db, data) {
    const { institution_id, module_key, is_enabled, is_locked } = data;
  
    await db.query(
      `
      INSERT INTO module_enablement (
        institution_id, module_key, is_enabled, is_locked
      )
      VALUES ($1,$2,$3,$4)
      ON CONFLICT (institution_id, module_key)
      DO NOTHING
      `,
      [institution_id, module_key, is_enabled, is_locked]
    );
  }
  
  // 4. Get modules for institution
  async function getInstitutionModules(db, institutionId) {
    const { rows } = await db.query(
      `
      SELECT
        m.module_key,
        m.display_name,
        m.short_description,
        e.is_enabled,
        e.is_locked
      FROM module_enablement e
      JOIN module_catalog m ON m.module_key = e.module_key
      WHERE e.institution_id = $1
      ORDER BY m.display_name
      `,
      [institutionId]
    );
  
    return rows;
  }
  
  // 5. Toggle module
  async function toggleModule(db, data) {
    const { institution_id, module_key, enable } = data;
  
    await db.query(
      `
      UPDATE module_enablement
      SET is_enabled = $3
      WHERE institution_id = $1
        AND module_key = $2
        AND is_locked = false
      `,
      [institution_id, module_key, enable]
    );
  }
  
  // 6. Add permission
  async function addPermission(db, data) {
    const { module_key, permission_key, title, description } = data;
  
    await db.query(
      `
      INSERT INTO module_permission_param (
        module_key, permission_key, title, description
      )
      VALUES ($1,$2,$3,$4)
      ON CONFLICT (module_key, permission_key)
      DO NOTHING
      `,
      [module_key, permission_key, title, description]
    );
  }
  
  // 7. Get permissions
  async function getPermissions(db, moduleKey) {
    const { rows } = await db.query(
      `
      SELECT permission_key, title, description
      FROM module_permission_param
      WHERE module_key = $1
      `,
      [moduleKey]
    );
  
    return rows;
  }
  