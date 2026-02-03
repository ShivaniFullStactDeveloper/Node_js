// // src/module/systemSetup/systemSetupController.js
// const service = require('./systemSetupService');

// module.exports = {
//   createFirstSuperAdmin,
// };

// async function createFirstSuperAdmin(req, res) {
//   try {
//     // simple security check
//     if (
//       req.headers['x-system-setup-key'] !==
//       process.env.SYSTEM_SETUP_KEY
//     ) {
//       return res.status(403).json({
//         message: 'Not allowed',
//       });
//     }

//     const result = await service.createFirstSuperAdmin(req.body);

//     res.status(201).json({
//       success: true,
//       data: result,
//     });
//   } catch (err) {
//     res.status(400).json({
//       success: false,
//       message: err.message,
//     });
//   }
// }


const service = require('./systemSetupService');

module.exports = {
  createFirstSuperAdmin,
};

async function createFirstSuperAdmin(req, res) {
  try {
    const result = await service.createFirstSuperAdmin(req.body);
    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}
