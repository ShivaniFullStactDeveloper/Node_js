const institutionService = require('./institutionService');

exports.createInstitution = async (req, res) => {
  try {
    const result = await institutionService.createInstitution(req.body);
    res.status(201).json({
      success: true,
      data: result
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};
