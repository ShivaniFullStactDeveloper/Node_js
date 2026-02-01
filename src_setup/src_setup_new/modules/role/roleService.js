const roleRepo = require('./roleRepo');

exports.assignAdminRole = async ({
  tenantId,
  institutionId,
  institutionType,
  adminUserId
}) => {
  // Fetch role template
  const template =
    await roleRepo.getAdminRoleTemplate(institutionType);

  if (!template) {
    throw new Error('Admin role template not found');
  }

  // Create tenant role
  const role =
    await roleRepo.createRoleFromTemplate(
      tenantId,
      template
    );

  // Assign role to admin user
  await roleRepo.assignRoleToUser({
    tenantId,
    institutionId,
    userId: adminUserId,
    roleId: role.id
  });

  return role;
};
