const service = require("./moduleService");

exports.createModule = async (req, res) => {
  try {
    const data = await service.createModule(req.body);
    res.status(201).json({ success: true, data });
  } catch (e) {
    res.status(400).json({ success: false, error: e.message });
  }
};

exports.getModulesForInstitution = async (req, res) => {
  try {
    const { institutionId, instituteType } = req.query;
    const data = await service.getModulesForInstitution(
      institutionId,
      instituteType
    );
    res.json({ success: true, data });
  } catch (e) {
    res.status(400).json({ success: false, error: e.message });
  }
};

// exports.assignModules = async (req, res) => {
//   try {
//     const data = await service.assignModules(req.body);
//     res.json({ success: true, data });
//   } catch (e) {
//     res.status(400).json({ success: false, error: e.message });
//   }
// };
