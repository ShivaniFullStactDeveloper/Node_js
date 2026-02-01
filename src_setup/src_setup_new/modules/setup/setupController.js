const setupService = require('./setupService');

exports.createTenant = async (req, res) => {
  try {
    const data = await setupService.createTenant(req.body);
    res.status(201).json({
      success: true,
      data
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};
// 
exports.startOnboarding = async (req, res) => {
  try {
    const data = await setupService.startOnboarding(req.body);
    res.status(201).json({
      success: true,
      data
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};
