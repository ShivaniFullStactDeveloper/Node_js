// src/module/roles/roleService.js
const db = require('../../config/db');
const roleRepo = require('./roleRepo');

module.exports = {
  autoCreateRoles,
};

async function autoCreateRoles(
  tenantId,
  institutionId,
  superAdminUserId
) {
  // 1️⃣ Default roles
  const roles = [
    { key: 'SUPER_ADMIN', name: 'Super Admin' },
    { key: 'ADMIN', name: 'Admin' },
    { key: 'TEACHER', name: 'Teacher' },
    { key: 'STUDENT', name: 'Student' },
  ];

  // 2️⃣ Fetch enabled modules
  const { rows: modules } = await db.query(
    `
    SELECT module_key
    FROM module_enablement
    WHERE institution_id = $1
      AND is_enabled = true
    `,
    [institutionId]
  );

  for (const r of roles) {
    const role = await roleRepo.createRole(db, {
      tenant_id: tenantId,
      role_key: r.key,
      display_name: r.name,
      is_system: true,
    });

    if (!role) continue;

    // SUPER ADMIN → all permissions
    if (r.key === 'SUPER_ADMIN') {
      await roleRepo.assignAllModules(db, role.id, modules);

      await roleRepo.assignRoleToUser(db, {
        tenant_id: tenantId,
        institution_id: institutionId,
        user_id: superAdminUserId,
        role_id: role.id,
      });
    }
  }
}
