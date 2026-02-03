// // src/module/onboarding/onboardingService.js
// const onboardingRepo = require('./onboardingRepo');

// module.exports = {
//   startOnboarding,
//   completeStep,
// };

// async function startOnboarding(
//   client,
//   tenantId,
//   institutionId,
//   userId
// ) {
//   return onboardingRepo.createSession(client, {
//     tenant_id: tenantId,
//     institution_id: institutionId,
//     user_id: userId,
//   });
// }

// async function completeStep({
//     onboarding_session_id,
//     step_key,
//     user_id,
//     payload = {},
//   }) {
//     return onboardingRepo.markStepCompleted({
//       onboarding_session_id,
//       step_key,
//       user_id,
//       payload,
//     });
//   }


const db = require('../../config/db');
const onboardingRepo = require('./onboardingRepo');
const institutionRepo = require('../institution/institutionRepo');

module.exports = {
  startOnboarding,
  completeStep,
};

// Already exists
async function startOnboarding(client, tenantId, institutionId, userId) {
  const session = await onboardingRepo.createSession(client, {
    tenant_id: tenantId,
    institution_id: institutionId,
    user_id: userId,
  });

  return session;
}

// 🔥 STEP COMPLETE + FINAL CHECK
async function completeStep(sessionId, stepKey, payload = {}) {
  // 1️⃣ Mark step completed
  await onboardingRepo.updateStep(db, {
    onboarding_session_id: sessionId,
    step_key: stepKey,
    payload,
  });

  // 2️⃣ Check if ALL steps completed
  const { rows } = await db.query(
    `
    SELECT COUNT(*) FILTER (WHERE state != 'completed') AS pending
    FROM onboarding_step_progress
    WHERE onboarding_session_id = $1
    `,
    [sessionId]
  );

  const pending = Number(rows[0].pending);

  // 3️⃣ If no pending steps → COMPLETE ONBOARDING
  if (pending === 0) {
    // update onboarding_session
    const { rows: sessionRows } = await db.query(
      `
      UPDATE onboarding_session
      SET status = 'completed'
      WHERE id = $1
      RETURNING institution_id
      `,
      [sessionId]
    );

    const institutionId = sessionRows[0].institution_id;

    // 4️⃣ ACTIVATE INSTITUTION 🔥
    await institutionRepo.activateInstitution(db, institutionId);
  }
}
