const crypto = require('crypto');
const bcrypt = require('bcrypt');
const repo = require('./setupRepo');

exports.createTenant = async (payload) => {
  const {
    tenant_kind,
    tenant_name,
    default_language,
    admin_email,
    admin_password
  } = payload;

  if (!tenant_kind || !tenant_name || !admin_email || !admin_password) {
    throw new Error('Missing required fields');
  }

  const tenantId = crypto.randomUUID();
  const userId = crypto.randomUUID();

  // Insert tenant
  await repo.insertTenant({
    id: tenantId,
    tenant_kind,
    name: tenant_name,
    status: 'draft',
    default_language
  });

  // Create admin user
  const passwordHash = await bcrypt.hash(admin_password, 10);
  await repo.insertUser({
    id: userId,
    email: admin_email,
    password_hash: passwordHash,
    status: 'active'
  });

  // tenant_user mapping
  await repo.insertTenantUser({
    tenant_id: tenantId,
    user_id: userId,
    is_owner: true,
    status: 'active'
  });

  // onboarding session
  await repo.insertOnboardingSession({
    tenant_id: tenantId,
    status: 'in_progress'
  });

  return {
    tenant_id: tenantId,
    admin_user_id: userId
  };
};

// UPDATE ONBOARDING SERVICE
exports.startOnboarding = async ({
  tenant_id,
  institution_id,
  started_by
}) => {
  if (!tenant_id || !institution_id) {
    throw new Error('tenant_id and institution_id required');
  }

  const existing = await setupRepo.findActiveOnboarding(
    tenant_id,
    institution_id
  );

  if (existing) return existing;

  const session = await setupRepo.createOnboardingSession({
    tenantId: tenant_id,
    institutionId: institution_id,
    startedBy: started_by
  });

  return session;
};

// Enable Default Modules Service
const moduleRepo = require('../module_catalog/moduleRepo');
// const onboardingRepo = require('../onboarding/onboardingRepo');

exports.enableDefaultModules = async ({
  institution_id,
  institution_type,
  onboarding_session_id
}) => {
  //  Fetch defaults
  const defaultModules =
    await moduleRepo.getDefaultModulesByInstitutionType(
      institution_type
    );

  // Enable modules
  await moduleRepo.enableModulesForInstitution(
    institution_id,
    defaultModules
  );

  // Mark onboarding step completed
  if (onboarding_session_id) {
    await onboardingRepo.completeStep({
      onboarding_session_id,
      step_key: 'modules_enabled'
    });
  }
  return {
    enabled_modules: defaultModules.map(m => m.module_key)
  };
};
