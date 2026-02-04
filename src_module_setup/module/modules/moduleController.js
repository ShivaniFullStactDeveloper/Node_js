/**
 * Controller ka kaam:
 * - request lena
 * - service call karna
 * - response dena
 */

const service = require("./moduleService");

exports.createModule = async (req, res) => {
  const modules = req.body;

  // validate array
  if (!Array.isArray(modules)) {
    return res.status(400).json({
      success: false,
      message: "Array of modules required"
    });
  }

  await service.createModules(modules);

  res.status(201).json({
    success: true,
    message: "Modules created successfully"
  });
};


exports.assignDefaults = async (req, res) => {
  await service.assignDefaults(req.body);
  res.json({ message: "Defaults assigned to institute type" });
};

exports.getDefaults = async (req, res) => {
  const data = await service.getDefaults(req.params.institution_type);
  res.json(data);
};

exports.applyDefaultsToInstitution = async (req, res) => {
  const { institution_id, institution_type } = req.body;
  await service.applyDefaults(institution_id, institution_type);
  res.json({ message: "Modules applied to institution" });
};

exports.toggleModule = async (req, res) => {
  await service.toggleModule(req.body);
  res.json({ message: "Module updated" });
};
