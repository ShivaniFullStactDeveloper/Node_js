const tosRepo = require('./tosRepo');
const onboardingRepo = require('../onboarding/onboardingRepo');

// exports.acceptTos = async (institutionId) => {
//   // 1️⃣ get active TOS
//   const activeTos = await tosRepo.getActiveTos();

//   if (!activeTos) {
//     throw new Error('No active TOS found');
//   }

//   // 2️⃣ insert acceptance
//   const acceptance = await tosRepo.acceptTos({
//     tosId: activeTos.id,
//     institutionId
//   });

//   // 3️⃣ onboarding step complete
//   await onboardingRepo.markStepCompleted(
//     institutionId,
//     'tos_accept'
//   );

//   return acceptance;
// };

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
  