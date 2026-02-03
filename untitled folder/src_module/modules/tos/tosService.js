
// const db = require('../../config/db');
// const tosRepo = require('./tosRepo');

// module.exports = {
//   createTos,
//   getActiveTos,
//   acceptTosAndCompleteOnboarding,
// };

// async function createTos(payload) {
//   return tosRepo.createTos(db, payload);
// }

// async function getActiveTos() {
//   const tos = await tosRepo.getActiveTos(db);

//   if (!tos) {
//     throw new Error('No active TOS found');
//   }

//   return tos;
// }


// //   SUPER ADMIN accepts TOS
// //   This is the LAST onboarding step

// async function acceptTosAndCompleteOnboarding(payload) {
//   const {
//     tenant_id,
//     institution_id,
//     user_id,
//     onboarding_session_id,
//   } = payload;

//   // Fetch active TOS
//   const tos = await tosRepo.getActiveTos(db);
//   if (!tos) {
//     throw new Error('Active TOS not available');
//   }

//   // Store acceptance
//   await tosRepo.acceptTos(db, {
//     tos_id: tos.id,
//     tenant_id,
//     institution_id,
//     user_id,
//   });

//   // Mark onboarding step complete
//   await db.query(
//     `
//     UPDATE onboarding_step_progress
//     SET state = 'completed',
//         updated_at = now()
//     WHERE onboarding_session_id = $1
//       AND step_key = 'tos_acceptance'
//     `,
//     [onboarding_session_id]
//   );

//   //  Complete onboarding session
//   await db.query(
//     `
//     UPDATE onboarding_session
//     SET status = 'completed'
//     WHERE id = $1
//     `,
//     [onboarding_session_id]
//   );

//   //  Activate institution 
//   await db.query(
//     `
//     UPDATE institution
//     SET status = 'active'
//     WHERE id = $1
//     `,
//     [institution_id]
//   );
// }


// src/module/tos/tosService.js
const db = require('../../config/db');
const tosRepo = require('./tosRepo');
const onboardingService = require('../onboarding/onboardingService');

module.exports = {
  getActiveTOS,
  acceptTOS,
};

async function getActiveTOS() {
  const tos = await tosRepo.getActiveTOS(db);

  if (!tos) {
    throw new Error('No active Terms of Service found');
  }

  return tos;
}

async function acceptTOS(payload, userId) {
  const { tenant_id, institution_id, onboarding_session_id } =
    payload;

  const tos = await tosRepo.getActiveTOS(db);

  if (!tos) {
    throw new Error('No active TOS');
  }

  await tosRepo.acceptTOS(db, {
    tos_id: tos.id,
    tenant_id,
    institution_id,
    user_id: userId,
  });

  // 🔥 onboarding step complete
  await onboardingService.completeStep(
    onboarding_session_id,
    'tos_acceptance',
    { accepted: true }
  );
}
