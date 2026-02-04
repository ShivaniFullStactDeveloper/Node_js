// const db = require("../../config/db");

// exports.createTenantAndInstitution = async ({
//   tenant_kind,
//   name,
//   institution_type,
//   default_language,
//   display_name ,
//    legal_name
// }) => {
//   // tenant
//   const tenant = await db.query(
//     `
//     INSERT INTO tenant (id, tenant_kind, name, status, default_language)
//     VALUES (gen_random_uuid(), $1, 'onboarding', $2)
//     RETURNING id
//     `,
//     [tenant_kind, name, default_language]
//   );

//   // institution
//   const institution = await db.query(
//     `
//     INSERT INTO institution (id, tenant_id, institution_type, status , display_name , legal_name)
//     VALUES (gen_random_uuid(), $1, $2, 'draft')
//     RETURNING id
//     `,
//     [tenant.rows[0].id, institution_type, display_name , legal_name]
//   );

//   return {
//     tenant_id: tenant.rows[0],
//     institution_id: institution.rows[0]
//   };
// };


const db = require('../../config/db');
  
  exports.createTenant = async (client, data) => {
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
  
exports.findTenantById = async (db, tenantId) => {
    const { rows } = await db.query(
      `SELECT * FROM tenant WHERE id = $1`,
      [tenantId]
    );
    return rows[0];
  }
  