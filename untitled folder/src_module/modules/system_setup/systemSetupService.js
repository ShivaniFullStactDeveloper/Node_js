// // src/module/systemSetup/systemSetupService.js
// const db = require('../../config/db');

// module.exports = {
//   createFirstSuperAdmin,
// };

// async function createFirstSuperAdmin({ email, password }) {
//   // check super admin already exist or not
//   const check = await db.query(
//     `
//     SELECT 1
//     FROM user_role_assignment ura
//     JOIN role r ON r.id = ura.role_id
//     WHERE r.role_key = 'SUPER_ADMIN'
//     `
//   );

//   if (check.rows.length > 0) {
//     throw new Error('System already initialized');
//   }

//   // create user
//   const userResult = await db.query(
//     `
//     INSERT INTO "user" (
//       id, email, password_hash, status, created_at
//     )
//     VALUES (gen_random_uuid(), $1, $2, 'active', now())
//     RETURNING id
//     `,
//     [email, password]
//   );

//   const userId = userResult.rows[0].id;

//   // create SUPER_ADMIN role (if not exists)
//   const roleResult = await db.query(
//     `
//     INSERT INTO role (
//       id, tenant_id, role_key, display_name, is_system, created_at
//     )
//     VALUES (
//       gen_random_uuid(),
//       NULL,
//       'SUPER_ADMIN',
//       'Super Administrator',
//       true,
//       now()
//     )
//     ON CONFLICT (role_key) DO NOTHING
//     RETURNING id
//     `
//   );

//   const roleId =
//     roleResult.rows[0]?.id ||
//     (
//       await db.query(
//         `SELECT id FROM role WHERE role_key = 'SUPER_ADMIN'`
//       )
//     ).rows[0].id;

//   // assign role to user
//   await db.query(
//     `
//     INSERT INTO user_role_assignment (
//       id, tenant_id, institution_id, user_id, role_id, assigned_at
//     )
//     VALUES (
//       gen_random_uuid(),
//       NULL,
//       NULL,
//       $1,
//       $2,
//       now()
//     )
//     `,
//     [userId, roleId]
//   );

//   return {
//     message: 'First Super Admin created successfully',
//     user_id: userId,
//   };
// }



const repo = require('./systemSetupRepo');

module.exports = {
  createFirstSuperAdmin,
};

async function createFirstSuperAdmin({ email, password }) {
    
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  //  Check if super admin already exists
  const exists = await repo.superAdminExists();
  if (exists) {
    throw new Error('Super Admin already created');
  }

  // Create user
  const user = await repo.createUser(email, password);

  // Create SUPER_ADMIN role
  const role = await repo.createSuperAdminRole();

  // Assign role to user
  await repo.assignRoleToUser(user.id, role.id);

  return {
    message: 'Super Admin created successfully',
    user_id: user.id,
    role: 'SUPER_ADMIN',
  };
}
