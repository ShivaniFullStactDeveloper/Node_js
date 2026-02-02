const db = require('../../config/database');

// ----------------------------------
// Create institution onboarding session
// ----------------------------------
exports.createInstitutionOnboardingSession = async (institutionId, tenantId) => {
  const { rows } = await db.query(
    `
    INSERT INTO onboarding_session (
      tenant_id,
      institution_id,
      status,
      started_at
    )
    VALUES ($1, $2, 'in_progress', now())
    RETURNING *
    `,
    [tenantId, institutionId]
  );

  return rows[0];
};

// ----------------------------------
// Get active onboarding session
// ----------------------------------
exports.getActiveInstitutionSession = async (institutionId) => {
  const { rows } = await db.query(
    `
    SELECT *
    FROM onboarding_session
    WHERE institution_id = $1
      AND status = 'in_progress'
    ORDER BY started_at DESC
    LIMIT 1
    `,
    [institutionId]
  );

  return rows[0];
};

// ----------------------------------
// Mark onboarding step completed
// ----------------------------------
exports.markStepCompleted = async (institutionId, stepKey) => {
  const session = await exports.getActiveInstitutionSession(institutionId);

  if (!session) {
    throw new Error('Active onboarding session not found');
  }

  await db.query(
    `
    INSERT INTO onboarding_step_progress (
      onboarding_session_id,
      step_key,
      state
    )
    VALUES ($1, $2, 'completed')
    ON CONFLICT (onboarding_session_id, step_key)
    DO UPDATE SET state = 'completed'
    `,
    [session.id, stepKey]
  );

  return true;
};
