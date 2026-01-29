const { randomUUID } = require('crypto');
const institutionRepo = require('./institutionRepo');

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
        throw new Error('tenant_id, institution_type, name are required');
    }

    const tenant = await repo.getTenantById(tenant_id);
    if (!tenant) throw new Error('Tenant not found');

    const institutionId = randomUUID();

    // 1. Create institution
    await institutionRepo.insertInstitution({
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

    // 2. Create institution profile (basic)
    await institutionRepo.insertInstitutionProfile({
        institution_id: institutionId,
        display_name: name
    });

    return {
        institution_id: institutionId
    };
};
