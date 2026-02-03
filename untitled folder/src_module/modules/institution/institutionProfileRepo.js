module.exports = {
    upsertProfile,
  };
  
  async function upsertProfile(client, data) {
    const {
      institution_id,
      display_name,
      primary_email,
      primary_phone,
      address_line1,
      city,
      state,
      country,
    } = data;
  
    await client.query(
      `
      INSERT INTO institution_profile (
        institution_id,
        display_name,
        primary_email,
        primary_phone,
        address_line1,
        city,
        state,
        country
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      ON CONFLICT (institution_id)
      DO UPDATE SET
        display_name = EXCLUDED.display_name,
        primary_email = EXCLUDED.primary_email,
        primary_phone = EXCLUDED.primary_phone,
        address_line1 = EXCLUDED.address_line1,
        city = EXCLUDED.city,
        state = EXCLUDED.state,
        country = EXCLUDED.country,
        updated_at = now()
      `,
      [
        institution_id,
        display_name,
        primary_email,
        primary_phone,
        address_line1,
        city,
        state,
        country,
      ]
    );
  }
  