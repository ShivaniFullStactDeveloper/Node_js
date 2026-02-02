const tenantService = require('./tenantService');

module.exports = {
  createTenant,
  getTenantById,
};

async function createTenant(req, res, next) {
  try {
    console.log('REQ BODY 👉', req.body);

    const tenant = await tenantService.createTenant(
      req.body,
      req.user?.id
    );

    res.status(201).json({
      success: true,
      data: tenant,
    });
  } catch (err) {
    next(err);
  }
}

async function getTenantById(req, res, next) {
  try {
    const tenant = await tenantService.getTenantById(req.params.id);
    res.json({ success: true, data: tenant });
  } catch (err) {
    next(err);
  }
}
