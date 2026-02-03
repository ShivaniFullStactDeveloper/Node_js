module.exports = {
    createInstitution,
    activateInstitution
  };
//   Create  Institution
  async function createInstitution(client, data) {
    const {
      tenant_id,
      institution_type,
      name,
      legal_name,
      created_by,
    } = data;
  
    const { rows } = await client.query(
      `
      INSERT INTO institution (
        tenant_id,
        institution_type,
        name,
        legal_name,
        status,
        created_by
      )
      VALUES ($1, $2, $3, $4, 'draft', $5)
      RETURNING *
      `,
      [tenant_id, institution_type, name, legal_name, created_by]
    );
  
    return rows[0];
  }
  
  // ADD THIS FUNCTION
async function activateInstitution(db, institutionId) {
    await db.query(
      `
      UPDATE institution
      SET status = 'active'
      WHERE id = $1
      `,
      [institutionId]
    );
  }

