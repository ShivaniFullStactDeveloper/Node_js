// src/module/roles/roleRepo.js
module.exports = {
    createRole,
    assignAllModules,
    assignRoleToUser,
  };
  
  async function createRole(db, data) {
    const { tenant_id, role_key, display_name, is_system } = data;
  
    const { rows } = await db.query(
      `
      INSERT INTO role (
        id, tenant_id, role_key, display_name, is_system, created_at
      )
      VALUES (gen_random_uuid(),$1,$2,$3,$4,now())
      ON CONFLICT (tenant_id, role_key)
      DO NOTHING
      RETURNING *
      `,
      [tenant_id, role_key, display_name, is_system]
    );
  
    return rows[0];
  }
  
  // SUPER ADMIN → all modules allow
  async function assignAllModules(db, roleId, modules) {
    for (const m of modules) {
      await db.query(
        `
        INSERT INTO role_module_access (
          role_id, module_key, allow_mask, deny_mask
        )
        VALUES ($1,$2,2147483647,0)
        ON CONFLICT (role_id, module_key)
        DO NOTHING
        `,
        [roleId, m.module_key]
      );
    }
  }
  
  async function assignRoleToUser(db, data) {
    const { tenant_id, institution_id, user_id, role_id } = data;
  
    await db.query(
      `
      INSERT INTO user_role_assignment (
        id, tenant_id, institution_id, user_id, role_id, assigned_at
      )
      VALUES (gen_random_uuid(),$1,$2,$3,$4,now())
      `,
      [tenant_id, institution_id, user_id, role_id]
    );
  }
  