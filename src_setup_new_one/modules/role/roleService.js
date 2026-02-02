const roleRepo = require('./roleRepo');

exports.assignAdminRole = async ({
  tenantId,
  institutionId,
  institutionType,
  adminUserId
}) => {
  // 1️⃣ Fetch role template
  const template =
    await roleRepo.getAdminRoleTemplate(institutionType);

  if (!template) {
    throw new Error('Admin role template not found');
  }

  // 2️⃣ Create tenant role
  const role =
    await roleRepo.createRoleFromTemplate(
      tenantId,
      template
    );

  // 3️⃣ Assign role to admin user
  await roleRepo.assignRoleToUser({
    tenantId,
    institutionId,
    userId: adminUserId,
    roleId: role.id
  });

  return role;
};
