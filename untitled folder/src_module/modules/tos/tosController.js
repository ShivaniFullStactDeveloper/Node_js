
// const tosService = require('./tosService');

// module.exports = {
//   createTos,
//   getActiveTos,
//   acceptTos,
// };

// //  Create TOS (system/admin)
// async function createTos(req, res, next) {
//   try {
//     const tos = await tosService.createTos(req.body);
//     res.status(201).json({
//       success: true,
//       data: tos,
//     });
//   } catch (err) {
//     next(err);
//   }
// }

// //  Get active TOS (UI)
// async function getActiveTos(req, res, next) {
//   try {
//     const tos = await tosService.getActiveTos();
//     res.json({
//       success: true,
//       data: tos,
//     });
//   } catch (err) {
//     next(err);
//   }
// }

// //  Accept TOS (SUPER ADMIN)
// async function acceptTos(req, res, next) {
//   try {
//     await tosService.acceptTosAndCompleteOnboarding(req.body);
//     res.json({
//       success: true,
//       message: 'TOS accepted, institution activated',
//     });
//   } catch (err) {
//     next(err);
//   }
// }



// src/module/tos/tosController.js
const tosService = require('./tosService');

module.exports = {
  getActiveTOS,
  acceptTOS,
};

async function getActiveTOS(req, res, next) {
  try {
    const tos = await tosService.getActiveTOS();
    res.json({ success: true, data: tos });
  } catch (err) {
    next(err);
  }
}

async function acceptTOS(req, res, next) {
  try {
    await tosService.acceptTOS(req.body, req.user.id);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}
