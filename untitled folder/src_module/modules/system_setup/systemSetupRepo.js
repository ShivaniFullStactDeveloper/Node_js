const db = require('../../config/db');

module.exports = {
  superAdminExists,
  createUser,
  createSuperAdminRole,
  assignRoleToUser,
};

async function superAdminExists() {
  const { rows } = await db.query(
    `SELECT 1 FROM role WHERE role_key = 'SUPER_ADMIN'`
  );
  return rows.length > 0;
}

async function createUser(email, password) {
  const { rows } = await db.query(
    `
    INSERT INTO "user" (id, email, password_hash, status, created_at)
    VALUES (gen_random_uuid(), $1, $2, 'active', now())
    RETURNING id, email
    `,
    [email, password]
  );
  return rows[0];
}

async function createSuperAdminRole() {
  const { rows } = await db.query(
    `
    INSERT INTO role (
      id, tenant_id, role_key, display_name, is_system, created_at
    )
    VALUES (
      gen_random_uuid(),
      NULL,
      'SUPER_ADMIN',
      'Super Administrator',
      true,
      now()
    )
    RETURNING id
    `
  );
  return rows[0];
}

async function assignRoleToUser(userId, roleId) {
  await db.query(
    `
    INSERT INTO user_role_assignment (
      id, tenant_id, institution_id, user_id, role_id, assigned_at
    )
    VALUES (
      gen_random_uuid(),
      NULL,
      NULL,
      $1,
      $2,
      now()
    )
    `,
    [userId, roleId]
  );
}
