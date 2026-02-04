// const db = require("../../config/db");

// exports.createTos = async ({
//   name,
//   version,
//   expiry_date,
//   status,
//   institute_types,
//   tos_types,
//   tenant_id
// }) => {
//   const query = `
//     INSERT INTO tos_document
//     (name, version, expiry_date, status, institute_types, tos_types, tenant_id)
//     VALUES ($1,$2,$3,$4,$5,$6,$7)
//     RETURNING id;
//   `;

//   const values = [
//     name,
//     version,
//     expiry_date,
//     status,
//     institute_types,
//     tos_types,
//     tenant_id
//   ];

//   const result = await db.query(query, values);
//   return result.rows[0];
// };
