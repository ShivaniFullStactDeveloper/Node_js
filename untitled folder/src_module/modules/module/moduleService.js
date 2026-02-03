// src/module/modules/moduleService.js
const db = require('../../config/db');
const repo = require('./moduleRepo');

module.exports = {
  createModule,
  assignInstituteType,
  assignToInstitution,
  getInstitutionModules,
  toggleModule,
  addPermission,
  getPermissions,
  autoAssignDefaultModules
};

async function createModule(payload) {
  await repo.createModule(db, payload);
}

async function assignInstituteType(payload) {
  await repo.assignInstituteType(db, payload);
}

async function assignToInstitution(payload) {
  await repo.assignToInstitution(db, payload);
}

async function getInstitutionModules(institutionId) {
  return repo.getInstitutionModules(db, institutionId);
}

async function toggleModule(payload) {
  await repo.toggleModule(db, payload);
}

async function addPermission(payload) {
  await repo.addPermission(db, payload);
}

async function getPermissions(moduleKey) {
  return repo.getPermissions(db, moduleKey);
}


async function autoAssignDefaultModules(institutionId, institutionType) {
    const { rows } = await db.query(
      `
      SELECT module_key, is_locked, can_enable
      FROM module_default_by_type
      WHERE institution_type = $1
      `,
      [institutionType]
    );
  
    for (const m of rows) {
      const isEnabled = m.is_locked || m.can_enable;
  
      await db.query(
        `
        INSERT INTO module_enablement (
          institution_id, module_key, is_enabled, is_locked
        )
        VALUES ($1,$2,$3,$4)
        ON CONFLICT (institution_id, module_key)
        DO NOTHING
        `,
        [institutionId, m.module_key, isEnabled, m.is_locked]
      );
    }
  }
  