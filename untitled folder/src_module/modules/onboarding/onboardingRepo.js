const db = require('../../config/db');

module.exports = {
    createSession,
    markStepCompleted,
  };
  
  async function createSession(client, data) {
    const { rows } = await client.query(
      `
      INSERT INTO onboarding_session (
        tenant_id,
        institution_id,
        flow_key,
        status,
        started_by_user_id,
        started_at
      )
      VALUES ($1,$2,'institution_setup','in_progress',$3,now())
      RETURNING *
      `,
      [data.tenant_id, data.institution_id, data.user_id]
    );
  
    return rows[0];
  }
  
// 
  async function markStepCompleted({
    onboarding_session_id,
    step_key,
    user_id,
    payload,
  }) {
    await db.query(
      `
      INSERT INTO onboarding_step_progress (
        id,
        onboarding_session_id,
        step_key,
        state,
        payload_json,
        forced_completed_by,
        forced_completed_at,
        created_at,
        updated_at
      )
      VALUES (
        gen_random_uuid(),
        $1,
        $2,
        'completed',
        $3,
        $4,
        now(),
        now(),
        now()
      )
      ON CONFLICT (onboarding_session_id, step_key)
      DO UPDATE SET
        state = 'completed',
        payload_json = $3,
        forced_completed_by = $4,
        forced_completed_at = now(),
        updated_at = now()
      `,
      [
        onboarding_session_id,
        step_key,
        payload,
        user_id,
      ]
    );
  }
  