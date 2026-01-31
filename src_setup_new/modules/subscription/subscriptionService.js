// const subscriptionRepo = require('./subscriptionRepo');
// const institutionRepo = require('../institution/institutionRepo');
// const onboardingRepo = require('../onboarding/onboardingRepo');

// exports.activateSubscription = async ({ institutionId, planId }) => {
//   const institution = await institutionRepo.getById(institutionId);
//   if (!institution) throw new Error('Institution not found');

//   const plan = await subscriptionRepo.getPlanById(planId);
//   if (!plan) throw new Error('Invalid subscription plan');

//   const startsAt = new Date();
//   const endsAt = new Date();
//   endsAt.setMonth(
//     endsAt.getMonth() + (plan.billing_cycle === 'yearly' ? 12 : 1)
//   );

//   const subscription = await subscriptionRepo.createSubscription({
//     tenantId: institution.tenant_id,
//     planId: plan.id,
//     startsAt,
//     endsAt
//   });

//   // onboarding step complete
//   await onboardingRepo.markStepCompleted(
//     institutionId,
//     'subscription'
//   );

//   return subscription;
// };


const subscriptionRepo = require('./subscriptionRepo');
const onboardingRepo = require('../onboarding/onboardingRepo');

exports.activateSubscription = async ({
  institution_id,
  plan_id
}) => {
  //  1. Institution check (BY ID)
  const institution =
    await subscriptionRepo.getInstitutionById(institution_id);

  if (!institution) {
    throw new Error('Institution not found');
  }

  //  2. Plan check
  const plan = await subscriptionRepo.getPlanById(plan_id);
  if (!plan) {
    throw new Error('Invalid subscription plan');
  }

  //  3. Dates
  const startsAt = new Date();
  const endsAt = new Date();
  endsAt.setMonth(
    endsAt.getMonth() + (plan.billing_cycle === 'yearly' ? 12 : 1)
  );

  //  4. Create subscription (USE tenant_id from institution)
  const subscription = await subscriptionRepo.createSubscription({
    tenant_id: institution.tenant_id,
    plan_id,
    starts_at: startsAt,
    ends_at: endsAt
  });

  //  5. Mark onboarding step complete
  await onboardingRepo.completeStep(
    institution.tenant_id,
    institution_id,
    'subscription'
  );

  return subscription;
};
