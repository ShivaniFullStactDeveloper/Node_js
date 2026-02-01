const tosRepo = require('./tosRepo.js');
const onboardingRepo = require('../onboarding/onboardingRepo.js');

exports.acceptTos = async (institutionId) => {
  // get active TOS
  const activeTos = await tosRepo.getActiveTos();
  if (!activeTos) {
    throw new Error('No active TOS found');
  }
  //   insert acceptance
  const acceptance = await tosRepo.acceptTos({
    tosId: activeTos.id,
    institutionId
  });

  //  now this will WORK
  await onboardingRepo.markStepCompleted(
    institutionId,
    'tos_accept'
  );

  return acceptance;
};
