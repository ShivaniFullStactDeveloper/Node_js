// // src/module/institution/institutionService.js

// const { withTransaction } = require('../../utils/transaction');
// const institutionRepo = require('./institutionRepo');
// const profileRepo = require('./institutionProfileRepo');
// const onboardingService = require('../onboarding/onboardingService');
// const moduleService = require('../modules/moduleService');
// const roleService = require('../roles/roleService');

// module.exports = {
//   createInstitutionWithProfile,
// };

// async function createInstitutionWithProfile(payload, userId) {
//   return withTransaction(async (client) => {
//     // 1. Create institution
//     const institution = await institutionRepo.createInstitution(client, {
//       tenant_id: payload.tenant_id,
//       institution_type: payload.institution_type,
//       name: payload.name,
//       legal_name: payload.legal_name,
//       created_by: userId,
//     });

//     // 2. Save profile
//     await profileRepo.upsertProfile(client, {
//       institution_id: institution.id,
//       ...payload.profile,
//     });

//     // 3. Start onboarding
//     await onboardingService.startOnboarding(
//       client,
//       payload.tenant_id,
//       institution.id,
//       userId
//     );

//     return institution;
//   });
// }

const { withTransaction } = require('../../utils/transaction');
const institutionRepo = require('./institutionRepo');
const profileRepo = require('./institutionProfileRepo');
const onboardingService = require('../onboarding/onboardingService');
const moduleService = require('../module/moduleService');
const roleService = require('../roles/roleService');

module.exports = {
    createInstitutionWithProfile,
  };

async function createInstitutionWithProfile(payload, userId) {
    return withTransaction(async (client) => {
  
      // Institution create
      const institution = await institutionRepo.createInstitution(client, {
        tenant_id: payload.tenant_id,
        institution_type: payload.institution_type,
        name: payload.name,
        legal_name: payload.legal_name,
        created_by: userId,
      });
  
      // Profile save
      await profileRepo.upsertProfile(client, {
        institution_id: institution.id,
        ...payload.profile,
      });
  
      // DEFAULT MODULES AUTO ASSIGN
      await moduleService.autoAssignDefaultModules(
        institution.id,
        institution.institution_type
      );
  
      // ROLES AUTO CREATE + SUPER ADMIN ASSIGN
      await roleService.autoCreateRoles(
        payload.tenant_id,
        institution.id,
        userId     // first user = SUPER ADMIN
      );
  
      // Onboarding start (LAST)
      await onboardingService.startOnboarding(
        client,
        payload.tenant_id,
        institution.id,
        userId
      );
  
      return institution;
    });
  }
  