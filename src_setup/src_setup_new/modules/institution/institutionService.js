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

// Domain
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

// Modules
exports.getModules = async (institutionId) => {
  return await repo.getInstitutionModules(institutionId);
};

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
