/**
 * Service layer:
 * - business rules
 * - validation
 */

const repo = require("./moduleRepo");

exports.createModules = async (modules) => {
    for (const m of modules) {
      if (!m.module_key || !m.display_name || !m.status) {
        throw new Error("Missing required fields in module");
      }
      await repo.createModule(
        m.module_key,
        m.display_name,
        m.status
      );
    }
  };

exports.assignDefaults = async ({ institution_type, modules }) => {
  for (const m of modules) {
    await repo.assignDefault(
      institution_type,
      m.module_key,
      m.default_status
    );
  }
};

exports.getDefaults = (institution_type) => {
  return repo.getDefaults(institution_type);
};

exports.applyDefaults = (institution_id, institution_type) => {
  return repo.copyDefaultsToInstitution(institution_id, institution_type);
};

exports.toggleModule = ({ institution_id, module_key, is_enabled }) => {
  return repo.toggleModule(institution_id, module_key, is_enabled);
};
