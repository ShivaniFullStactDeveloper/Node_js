
const institutionService = require('./institutionService');

module.exports = {
  createInstitution,
};

async function createInstitution(req, res, next) {
  try {
    const institution =
      await institutionService.createInstitutionWithProfile(
        req.body,
        req.user?.id
      );

    res.status(201).json({
      success: true,
      data: institution,
    });
  } catch (err) {
    next(err);
  }
}
