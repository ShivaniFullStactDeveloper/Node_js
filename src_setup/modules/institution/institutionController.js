// const institutionService = require('./institutionService');

// exports.createInstitution = async (req, res) => {
//   try {
//     const result = await institutionService.createInstitution(req.body);
//     res.status(201).json({
//       success: true,
//       data: result
//     });
//   } catch (err) {
//     res.status(400).json({
//       success: false,
//       message: err.message
//     });
//   }
// };

// // institution domain
// exports.addInstitutionDomain = async (req, res) => {
//   try {
//     const data = await institutionService.addInstitutionDomain(req.body);
//     res.status(201).json({
//       success: true,
//       data
//     });
//   } catch (err) {
//     res.status(400).json({
//       success: false,
//       message: err.message
//     });
//   }
// };

// // verify institution domain
// exports.verifyInstitutionDomain = async (req, res) => {
//   try {
//     const data = await institutionService.verifyInstitutionDomain(req.body);
//     res.status(200).json({
//       success: true,
//       data
//     });
//   } catch (err) {
//     res.status(400).json({
//       success: false,
//       message: err.message
//     });
//   }
// };

// // get institution modules
// exports.getInstitutionModules = async (req, res) => {
//   try {
//     const { institutionId } = req.params;

//     const modules =
//       await institutionService.getModules(institutionId);

//     res.json({
//       success: true,
//       data: modules
//     });
//   } catch (err) {
//     res.status(400).json({
//       success: false,
//       message: err.message
//     });
//   }
// };

// // get institution modules with UUID validation
// const { validate: isUUID } = require('uuid');


// exports.getInstitutionModules = async (req, res) => {
//   const { institutionId } = req.params;

//   if (!isUUID(institutionId)) {
//     return res.status(400).json({
//       success: false,
//       message: 'Invalid institution_id'
//     });
//   }

//   const data = await institutionService.getModules(institutionId);
//   res.json({ success: true, data });
// };



const institutionService = require('./institutionService');

// UUID validator (no uuid lib)
const isUUID = (v) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v);

// ----------------------------
exports.createInstitution = async (req, res) => {
  try {
    const data = await institutionService.createInstitution(req.body);
    res.status(201).json({ success: true, data });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

// ----------------------------
exports.addInstitutionDomain = async (req, res) => {
  try {
    const data = await institutionService.addInstitutionDomain(req.body);
    res.status(201).json({ success: true, data });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

// ----------------------------
exports.verifyInstitutionDomain = async (req, res) => {
  try {
    const data = await institutionService.verifyInstitutionDomain(req.body);
    res.json({ success: true, data });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

// ----------------------------
exports.getInstitutionModules = async (req, res) => {
  const { institutionId } = req.params;

  if (!isUUID(institutionId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid institution_id'
    });
  }

  const data = await institutionService.getModules(institutionId);
  res.json({ success: true, data });
};
