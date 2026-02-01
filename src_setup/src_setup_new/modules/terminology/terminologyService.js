const terminologyRepo = require('./terminologyRepo');
const institutionRepo = require('../institution/institutionRepo');

exports.loadDefaults = async (institutionId) => {
  // Get institution (tenant_id + type)
  const institution = await institutionRepo.getById(institutionId);

  if (!institution) {
    throw new Error('Institution not found');
  }

  const tenantId = institution.tenant_id;
  const institutionType = institution.institution_type;

  // Get default terminology by institution_type
  const defaults =
    await terminologyRepo.getDefaultsByInstitutionType(institutionType);

  // Insert into terminology_override
  for (const row of defaults) {
    await terminologyRepo.insertOverride({
      tenant_id: tenantId,
      institution_id: institutionId,
      term_id: row.term_id,
      language_code: row.language_code,
      label: row.label
    });
  }

  return {
    inserted: defaults.length
  };
};


exports.getInstitutionTerminology = async (institutionId) => {
  // Get institution
  const institution = await institutionRepo.getById(institutionId);

  if (!institution) {
    throw new Error('Institution not found');
  }

  const tenantId = institution.tenant_id;

  // Fetch terminology overrides
  const terms = await terminologyRepo.getByInstitutionId(
    tenantId,
    institutionId
  );

  return terms;
};
