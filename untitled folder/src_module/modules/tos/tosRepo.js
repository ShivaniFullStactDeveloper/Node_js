
// module.exports = {
//     createTos,
//     getActiveTos,
//     acceptTos,
//   };
  
//   // Create TOS (system/admin)
//   async function createTos(db, data) {
//     const {
//       name,
//       version,
//       effective_from,
//       expiry_date,
//     } = data;
  
//     const { rows } = await db.query(
//       `
//       INSERT INTO tos_document (
//         id, name, version, status,
//         effective_from, expiry_date,
//         created_at, updated_at
//       )
//       VALUES (
//         gen_random_uuid(), $1, $2, 'active',
//         $3, $4,
//         now(), now()
//       )
//       RETURNING *
//       `,
//       [name, version, effective_from, expiry_date]
//     );
  
//     return rows[0];
//   }
  
//   // Get active TOS (latest)
//   async function getActiveTos(db) {
//     const { rows } = await db.query(
//       `
//       SELECT *
//       FROM tos_document
//       WHERE status = 'active'
//         AND (expiry_date IS NULL OR expiry_date >= CURRENT_DATE)
//       ORDER BY effective_from DESC
//       LIMIT 1
//       `
//     );
  
//     return rows[0];
//   }
  
//   // Accept TOS
//   async function acceptTos(db, data) {
//     const {
//       tos_id,
//       tenant_id,
//       institution_id,
//       user_id,
//     } = data;
  
//     await db.query(
//       `
//       INSERT INTO tos_acceptance (
//         id, tos_id, tenant_id,
//         institution_id, user_id,
//         signed_at
//       )
//       VALUES (
//         gen_random_uuid(), $1, $2,
//         $3, $4,
//         now()
//       )
//       ON CONFLICT (tos_id, institution_id)
//       DO NOTHING
//       `,
//       [tos_id, tenant_id, institution_id, user_id]
//     );
//   }
  

// src/module/tos/tosRepo.js
module.exports = {
    getActiveTOS,
    acceptTOS,
  };
  
  async function getActiveTOS(db) {
    const { rows } = await db.query(
      `
      SELECT id, name, version, effective_from
      FROM tos_document
      WHERE status = 'active'
      ORDER BY effective_from DESC
      LIMIT 1
      `
    );
  
    return rows[0];
  }
  
  async function acceptTOS(db, data) {
    const { tos_id, tenant_id, institution_id, user_id } = data;
  
    await db.query(
      `
      INSERT INTO tos_acceptance (
        id, tos_id, tenant_id, institution_id, user_id, signed_at
      )
      VALUES (gen_random_uuid(),$1,$2,$3,$4,now())
      `,
      [tos_id, tenant_id, institution_id, user_id]
    );
  }
  