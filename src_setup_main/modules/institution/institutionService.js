// const { randomUUID } = require('crypto');
// const institutionRepo = require('./institutionRepo');

// exports.createInstitution = async (payload) => {
//     const {
//         tenant_id,
//         institution_type,
//         name,
//         legal_name,
//         grade_range,
//         boarding_flag,
//         admin_user_id
//     } = payload;

//     if (!tenant_id || !institution_type || !name) {
//         throw new Error('tenant_id, institution_type, name are required');
//     }

//     const tenant = await repo.getTenantById(tenant_id);
//     if (!tenant) throw new Error('Tenant not found');

//     const institutionId = randomUUID();

//     // 1. Create institution
//     await institutionRepo.insertInstitution({
//         id: institutionId,
//         tenant_id,
//         institution_type,
//         name,
//         legal_name,
//         grade_range,
//         boarding_flag,
//         status: 'active',
//         created_by: admin_user_id
//     });

//     // 2. Create institution profile (basic)
//     await institutionRepo.insertInstitutionProfile({
//         institution_id: institutionId,
//         display_name: name
//     });

//     return {
//         institution_id: institutionId
//     };
// };

// // institution domain ====================================
// exports.addInstitutionDomain = async (payload) => {
//     const { institution_id, domain, is_primary = true } = payload;
  
//     if (!institution_id || !domain) {
//       throw new Error('institution_id and domain are required');
//     }
  
//     // check institution exists
//     const inst = await institutionRepo.findInstitutionById(institution_id);
//     if (!inst) {
//       throw new Error('Institution not found');
//     }
  
//     // if primary → unset old primary domains
//     if (is_primary) {
//       await institutionRepo.clearPrimaryDomain(institution_id);
//     }
  
//     const domainId = randomUUID();
  
//     await institutionRepo.insertInstitutionDomain({
//       id: domainId,
//       institution_id,
//       domain,
//       is_primary,
//       verification_status: 'draft' // default
//     });
  
//     return {
//       institution_domain_id: domainId,
//       domain,
//       verification_status: 'draft'
//     };
//   };
  
// //   verify institution domain
// exports.verifyInstitutionDomain = async (payload) => {
//     const { institution_domain_id, verification_method = 'manual' } = payload;
  
//     // validate input
//     if (!institution_domain_id) {
//       throw new Error('institution_domain_id is required');
//     }
// //   check domain exists
//     const domain = await institutionRepo.findDomainById(institution_domain_id);
//     if (!domain) {
//       throw new Error('Domain not found');
//     }
// //   check if already verified
//     if (domain.verification_status === 'verified') {
//       return {
//         institution_domain_id,
//         status: 'already_verified'
//       };
//     }
// //   mark domain as verified
//     await institutionRepo.markDomainVerified({
//       id: institution_domain_id,
//       verification_method
//     });
  
//     return {
//       institution_domain_id,
//       status: 'verified'
//     };
//   };
  
// // get institution modules
//   exports.getModules = async (institution_id) => {
//     return await institutionRepo.getInstitutionModules(institution_id);
//   };
  

const repo = require('./institutionRepo');
const { randomUUID } = require('crypto');

exports.createInstitution = async (payload) => {
  const {
    tenant_id,
    institution_type,
    name,
    legal_name,
    grade_range,
    boarding_flag,
    created_by
  } = payload;

  if (!tenant_id || !institution_type || !name) {
    throw new Error('Missing required fields');
  }

  const institutionId = randomUUID();

  // 1 Create institution
  await repo.insertInstitution({
    id: institutionId,
    tenant_id,
    institution_type,
    name,
    legal_name,
    grade_range,
    boarding_flag,
    status: 'active',
    created_by
  });

  // 2 ENABLE DEFAULT MODULES FOR INSTITUTION
  await repo.insertDefaultModules({
    institution_id: institutionId,
    institution_type
  });

  return {
    institution_id: institutionId
  };
};

// ----------------------------
// Domain
// ----------------------------
exports.addInstitutionDomain = async (payload) => {
  const { institution_id, domain, is_primary } = payload;

  if (!institution_id || !domain) {
    throw new Error('institution_id and domain required');
  }

  const id = randomUUID();

  await repo.insertInstitutionDomain({
    id,
    institution_id,
    domain,
    is_primary: !!is_primary,
    verification_status: 'draft'
  });

  return { id };
};

exports.verifyInstitutionDomain = async (payload) => {
  const { institution_domain_id, verification_method } = payload;

  if (!institution_domain_id) {
    throw new Error('institution_domain_id required');
  }

  await repo.verifyInstitutionDomain({
    institution_domain_id,
    verification_method
  });

  return { verified: true };
};

// ----------------------------
// Modules
// ----------------------------
exports.getModules = async (institutionId) => {
  return await repo.getInstitutionModules(institutionId);
};

// // ============================================
// // HIGH LEVEL INSTITUTION SERVICE
// // ================================
// const roleService = require('./');

// exports.createInstitution = async (payload) => {
//   const institution =
//     await institutionRepo.create(payload);

//   // 🔥 AUTO ENABLE MODULES
//   await autoEnableModules(
//     institution.id,
//     institution.institution_type
//   );

//   // 🔥 AUTO ASSIGN ADMIN ROLE
//   await roleService.assignAdminRole({
//     tenantId: payload.tenant_id,
//     institutionId: institution.id,
//     institutionType: institution.institution_type,
//     adminUserId: payload.admin_user_id
//   });

//   return institution;
// };


// onboarding session
const onboardingRepo = require('../onboarding/onboardingRepo');

exports.createInstitution = async (payload) => {
  const institution = await institutionRepo.createInstitution(payload);

  // CREATE onboarding session for institution
  await onboardingRepo.createInstitutionOnboardingSession(
    institution.id,
    institution.tenant_id
  );

  return institution;
};
