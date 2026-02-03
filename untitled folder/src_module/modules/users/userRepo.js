
module.exports = {
  createUser,
  attachUserToInstitution,
  assignRoleToUser,
  findRoleByKey,
};

// Create user
async function createUser(db, data) {
  const { email, first_name, last_name } = data;

  const { rows } = await db.query(
    `
    INSERT INTO "user" (
      id, email, first_name, last_name, status, created_at
    )
    VALUES (gen_random_uuid(),$1,$2,$3,'active',now())
    ON CONFLICT (email) DO NOTHING
    RETURNING *
    `,
    [email, first_name, last_name]
  );

  return rows[0];
}

// Link user to institution
async function attachUserToInstitution(db, data) {
  const { institution_id, user_id } = data;

  await db.query(
    `
    INSERT INTO institution_user (
      institution_id, user_id, status, created_at
    )
    VALUES ($1,$2,'active',now())
    ON CONFLICT (institution_id, user_id)
    DO NOTHING
    `,
    [institution_id, user_id]
  );
}

// Assign role
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

// Find role by key
async function findRoleByKey(db, tenantId, roleKey) {
  const { rows } = await db.query(
    `
    SELECT id FROM role
    WHERE tenant_id = $1
      AND role_key = $2
    `,
    [tenantId, roleKey]
  );

  return rows[0];
}
