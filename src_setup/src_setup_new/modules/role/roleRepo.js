const db = require('../../config/database');

// get admin role template
exports.getAdminRoleTemplate = async (institutionType) => {
  const { rows } = await db.query(
    `
    SELECT *
    FROM role_template
    WHERE institution_type = $1
      AND role_key = 'ADMIN'
      AND status = 'active'
    `,
    [institutionType]
  );

  return rows[0];
};

// create role for tenant
exports.createRoleFromTemplate = async (
  tenantId,
  roleTemplate
) => {
  const { rows } = await db.query(
    `
    INSERT INTO role (
      id, tenant_id, role_key, display_name, is_system
    )
    VALUES (
      gen_random_uuid(), $1, $2, $3, true
    )
    RETURNING *
    `,
    [
      tenantId,
      roleTemplate.role_key,
      roleTemplate.display_name
    ]
  );

  return rows[0];
};

// assign role to user
exports.assignRoleToUser = async ({
  tenantId,
  institutionId,
  userId,
  roleId
}) => {
  await db.query(
    `
    INSERT INTO user_role_assignment (
      id, tenant_id, institution_id, user_id, role_id, assigned_at
    )
    VALUES (
      gen_random_uuid(), $1, $2, $3, $4, now()
    )
    `,
    [tenantId, institutionId, userId, roleId]
  );
};
