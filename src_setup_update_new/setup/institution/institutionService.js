const db = require("../../config/database");
const repo = require("./institutionRepo");
const { hashPassword } = require("../../utils/passwordUtils");

exports.setupInstitution = async (payload) => {

  //  BASIC VALIDATION (simple if-else)

  if (!payload.tenant)
    throw new Error("Tenant data is required");

  if (!payload.institution)
    throw new Error("Institution data is required");

  if (!payload.super_admin)
    throw new Error("Super admin data is required");

  if (!payload.languages || payload.languages.length === 0)
    throw new Error("At least one language is required");

  if (!payload.super_admin.email)
    throw new Error("Admin email is required");

  if (!payload.super_admin.password)
    throw new Error("Admin password is required");

  // DB TRANSACTION
  const client = await db.connect();

  try {
    await client.query("BEGIN");

    // TENANT
    const tenant = await repo.createTenant(
      client,
      payload.tenant
    );

    // INSTITUTION
    const institution = await repo.createInstitution(
      client,
      tenant.id,
      payload.institution
    );

    // SUPER ADMIN
    const passwordHash = await hashPassword(
      payload.super_admin.password
    );

    const admin = await repo.createSuperAdmin(
      client,
      institution.id,
      payload.super_admin,
      passwordHash
    );

    // THEME (optional)
    if (payload.theme) {
      await repo.createTheme(
        client,
        institution.id,
        payload.theme
      );
    }

    // LANGUAGES
    await repo.addLanguages(
      client,
      institution.id,
      payload.languages
    );

    await client.query("COMMIT");

    return {
      tenant_id: tenant.id,
      institution_id: institution.id,
      super_admin: admin
    };

  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};
