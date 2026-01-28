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

  // 1. Insert tenant
  await repo.insertTenant({
    id: tenantId,
    tenant_kind,
    name: tenant_name,
    status: 'draft',
    default_language
  });

  // 2. Create admin user
  const passwordHash = await bcrypt.hash(admin_password, 10);
  await repo.insertUser({
    id: userId,
    email: admin_email,
    password_hash: passwordHash,
    status: 'active'
  });

  // 3. tenant_user mapping
  await repo.insertTenantUser({
    tenant_id: tenantId,
    user_id: userId,
    is_owner: true,
    status: 'active'
  });

  // 4. onboarding session
  await repo.insertOnboardingSession({
    tenant_id: tenantId,
    status: 'in_progress'
  });

  return {
    tenant_id: tenantId,
    admin_user_id: userId
  };
};

// New service method for creating an institution
const { randomUUID } = require('crypto');


exports.createInstitution = async (payload) => {
    const {
      tenant_id,
      institution_type,
      name,
      legal_name,
      grade_range,
      boarding_flag,
      admin_user_id
    } = payload;
  
    if (!tenant_id || !institution_type || !name) {
      throw new Error('tenant_id, institution_type, name required');
    }
  
    const tenant = await repo.getTenantById(tenant_id);
    if (!tenant) throw new Error('Tenant not found');
  
    const institutionId = randomUUID();
  
    await repo.createInstitution({
      id: institutionId,
      tenant_id,
      institution_type,
      name,
      legal_name,
      grade_range,
      boarding_flag,
      status: 'active',
      created_by: admin_user_id
    });
  
    await repo.createInstitutionProfile({
      institution_id: institutionId,
      display_name: name
    });
  
    // first institution only
    if (!tenant.primary_institution_id) {
      await repo.updateTenantPrimaryInstitution(
        tenant_id,
        institutionId
      );
    }
  
    return { institution_id: institutionId };
  };