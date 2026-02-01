const subscriptionRepo = require('./subscriptionRepo');
const onboardingRepo = require('../onboarding/onboardingRepo');

exports.activateSubscription = async ({
  institution_id,
  plan_id
}) => {
  // Institution check (BY ID)
  const institution =
    await subscriptionRepo.getInstitutionById(institution_id);

  if (!institution) {
    throw new Error('Institution not found');
  }

  // Plan check
  const plan = await subscriptionRepo.getPlanById(plan_id);
  if (!plan) {
    throw new Error('Invalid subscription plan');
  }

  // Dates
  const startsAt = new Date();
  const endsAt = new Date();
  endsAt.setMonth(
    endsAt.getMonth() + (plan.billing_cycle === 'yearly' ? 12 : 1)
  );

  // Create subscription (USE tenant_id from institution)
  const subscription = await subscriptionRepo.createSubscription({
    tenant_id: institution.tenant_id,
    plan_id,
    starts_at: startsAt,
    ends_at: endsAt
  });

  // Mark onboarding step complete
  await onboardingRepo.completeStep(
    institution.tenant_id,
    institution_id,
    'subscription'
  );

  return subscription;
};
