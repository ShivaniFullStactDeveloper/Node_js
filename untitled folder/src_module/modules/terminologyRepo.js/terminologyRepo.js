// src/module/terminology/terminologyRepo.js
module.exports = {
    createGroup,
    createTerm,
    createDefault,
    getTerminology,
  };
  
  async function createGroup(db, data) {
    const { group_key, display_name } = data;
  
    const { rows } = await db.query(
      `
      INSERT INTO terminology_group (id, group_key, display_name)
      VALUES (gen_random_uuid(), $1, $2)
      ON CONFLICT (group_key) DO NOTHING
      RETURNING id
      `,
      [group_key, display_name]
    );
  
    return rows[0];
  }
  
  async function createTerm(db, data) {
    const { group_id, term_key, base_label } = data;
  
    const { rows } = await db.query(
      `
      INSERT INTO terminology_term (id, group_id, term_key, base_label)
      VALUES (gen_random_uuid(), $1, $2, $3)
      ON CONFLICT (term_key) DO NOTHING
      RETURNING id
      `,
      [group_id, term_key, base_label]
    );
  
    return rows[0];
  }
  
  async function createDefault(db, data) {
    const { term_id, institution_type, language_code, label } = data;
  
    await db.query(
      `
      INSERT INTO terminology_default (
        id, term_id, institution_type, language_code, label, created_at, updated_at
      )
      VALUES (gen_random_uuid(), $1, $2, $3, $4, now(), now())
      ON CONFLICT (term_id, institution_type, language_code)
      DO NOTHING
      `,
      [term_id, institution_type, language_code, label]
    );
  }
  
  async function getTerminology(db, institutionType, language) {
    const { rows } = await db.query(
      `
      SELECT 
        g.group_key,
        g.display_name AS group_name,
        t.term_key,
        d.label
      FROM terminology_term t
      JOIN terminology_group g ON g.id = t.group_id
      JOIN terminology_default d ON d.term_id = t.id
      WHERE d.institution_type = $1
        AND d.language_code = $2
      ORDER BY g.group_key
      `,
      [institutionType, language]
    );
  
    return rows;
  }
  