// src/module/modules/moduleController.js
const service = require('./moduleService');

module.exports = {
  createModule,
  assignInstituteType,
  assignToInstitution,
  getInstitutionModules,
  toggleModule,
  addPermission,
  getPermissions,
};

async function createModule(req, res, next) {
  try {
    await service.createModule(req.body);
    res.status(201).json({ success: true });
  } catch (err) {
    next(err);
  }
}

async function assignInstituteType(req, res, next) {
  try {
    await service.assignInstituteType(req.body);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

async function assignToInstitution(req, res, next) {
  try {
    await service.assignToInstitution(req.body);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

async function getInstitutionModules(req, res, next) {
  try {
    const data = await service.getInstitutionModules(
      req.params.institutionId
    );
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

async function toggleModule(req, res, next) {
  try {
    await service.toggleModule(req.body);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

async function addPermission(req, res, next) {
  try {
    await service.addPermission(req.body);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

async function getPermissions(req, res, next) {
  try {
    const data = await service.getPermissions(req.params.moduleKey);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}
