
const db = require('../../config/db');
const userRepo = require('./userRepo');

module.exports = {
  createUserAndAssignRole,
};

async function createUserAndAssignRole(payload) {
  const {
    tenant_id,
    institution_id,
    role_key,
    email,
    first_name,
    last_name,
  } = payload;

  // Create user
  const user =
    (await userRepo.createUser(db, {
      email,
      first_name,
      last_name,
    })) ||
    (
      await db.query(
        `SELECT * FROM "user" WHERE email = $1`,
        [email]
      )
    ).rows[0];

  // Attach to institution
  await userRepo.attachUserToInstitution(db, {
    institution_id,
    user_id: user.id,
  });

  // Find role
  const role = await userRepo.findRoleByKey(
    db,
    tenant_id,
    role_key
  );

  if (!role) {
    throw new Error('Invalid role');
  }

  // Assign role
  await userRepo.assignRoleToUser(db, {
    tenant_id,
    institution_id,
    user_id: user.id,
    role_id: role.id,
  });

  return user;
}
