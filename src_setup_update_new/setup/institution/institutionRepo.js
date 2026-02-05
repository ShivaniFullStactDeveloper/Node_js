exports.createTenant = async (client, data) => {
    const { rows } = await client.query(
      `INSERT INTO tenant (tenant_kind, default_language)
       VALUES ($1,$2)
       RETURNING *`,
      [data.tenant_kind, data.default_language]
    );
    return rows[0];
  };
  
  exports.createInstitution = async (client, tenantId, data) => {
    const { rows } = await client.query(
      `INSERT INTO institution
       (tenant_id, institute_type, name, tagline, about, primary_language)
       VALUES ($1,$2,$3,$4,$5,$6)
       RETURNING *`,
      [
        tenantId,
        data.institute_type,
        data.name,
        data.tagline,
        data.about,
        data.primary_language
      ]
    );
    return rows[0];
  };
  
  exports.createSuperAdmin = async (
    client,
    instituteId,
    admin,
    passwordHash
  ) => {
    const { rows } = await client.query(
      `INSERT INTO users
       (institute_id, role, email, mobile, password_hash)
       VALUES ($1,'SUPER_ADMIN',$2,$3,$4)
       RETURNING id,email`,
      [instituteId, admin.email, admin.mobile, passwordHash]
    );
    return rows[0];
  };
  
  exports.createTheme = async (client, instituteId, theme) => {
    await client.query(
      `INSERT INTO institution_theme_settings
       (institute_id, logo_url, splash_color, show_logo, show_tagline)
       VALUES ($1,$2,$3,$4,$5)`,
      [
        instituteId,
        theme.logo_url,
        theme.splash_color,
        theme.show_logo,
        theme.show_tagline
      ]
    );
  };
  
  exports.addLanguages = async (client, instituteId, languages) => {
    for (const lang of languages) {
      await client.query(
        `INSERT INTO institution_languages
         (institute_id, language_code)
         VALUES ($1,$2)`,
        [instituteId, lang]
      );
    }
  };
  