// const terminologyRepo = require('./terminologyRepo');
// const institutionRepo = require('../institution/institutionRepo');
// const setupTenantRepo = require('../setup/setupRepo');

// exports.getTerminologyForInstitution = async (institutionId) => {
//   const institution = await institutionRepo.getById(institutionId);
// //   throw error if institution not found
//   if (!institution) throw new Error('Institution not found');

//   const tenant = await setupTenantRepo.getById(institution.tenant_id);
// // throw error if tenant not found
//   if (!tenant) {
//     throw new Error('Tenant not found');
//   }

//   return terminologyRepo.getDefaults({
//     institutionType: institution.institution_type,
//     language: tenant.default_language
//   });
// };



// const institutionRepo = require('../institution/institutionRepo');
// const terminologyRepo = require('./terminologyRepo');

// exports.getTerminologyForInstitution = async (institutionId) => {
//   const institution = await institutionRepo.getById(institutionId);

//   if (!institution) {
//     throw new Error('Institution not found');
//   }

//   const institutionType = institution.institution_type;
//   const language = 'en'; // later tenant.default_language

//   return terminologyRepo.getDefaults(
//     institutionType,
//     language
//   );
// };


const terminologyRepo = require('./terminologyRepo');
const institutionRepo = require('../institution/institutionRepo');

exports.loadDefaults = async (institutionId) => {
  // 1️⃣ Get institution (tenant_id + type)
  const institution = await institutionRepo.getById(institutionId);

  if (!institution) {
    throw new Error('Institution not found');
  }

  const tenantId = institution.tenant_id;
  const institutionType = institution.institution_type;

  // 2️⃣ Get default terminology by institution_type
  const defaults =
    await terminologyRepo.getDefaultsByInstitutionType(institutionType);

  // 3️⃣ Insert into terminology_override
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
  // 1️⃣ Get institution
  const institution = await institutionRepo.getById(institutionId);

  if (!institution) {
    throw new Error('Institution not found');
  }

  const tenantId = institution.tenant_id;

  // 2️⃣ Fetch terminology overrides
  const terms = await terminologyRepo.getByInstitutionId(
    tenantId,
    institutionId
  );

  return terms;
};
