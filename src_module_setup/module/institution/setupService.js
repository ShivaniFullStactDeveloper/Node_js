const db = require('../../config/db');
const { withTransaction } = require('../../utils/transaction');
const tenantRepo = require('./setupRepo');

exports.createTenant = async (payload = {}, userId) => {
  const { tenant_kind, name, default_language } = payload;

  if (!tenant_kind || !name) {
    throw new Error('tenant_kind and name are required');
  }

  return withTransaction(async (client) => {
    return tenantRepo.createTenant(client, {
      tenant_kind,
      name,
      default_language,
      created_by: userId,
    });
  });
}

exports.getTenantById = async (tenantId) => {
  const tenant = await tenantRepo.findTenantById(db, tenantId);
  if (!tenant) {
    throw new Error('Tenant not found');
  }
  return tenant;
}
