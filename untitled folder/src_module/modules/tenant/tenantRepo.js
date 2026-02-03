const db = require('../../config/db');

module.exports = {
    createTenant,
    findTenantById,
  };
  
  async function createTenant(client, data) {
    const { tenant_kind, name, default_language, created_by } = data;
  
    const { rows } = await client.query(
      `
      INSERT INTO tenant (
        tenant_kind,
        name,
        default_language,
        status,
        created_by
      )
      VALUES ($1, $2, $3, 'draft', $4)
      RETURNING *
      `,
      [tenant_kind, name, default_language || 'en', created_by]
    );
  
    return rows[0];
  }
  
  async function findTenantById(db, tenantId) {
    const { rows } = await db.query(
      `SELECT * FROM tenant WHERE id = $1`,
      [tenantId]
    );
    return rows[0];
  }
  