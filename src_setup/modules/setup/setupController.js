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

// New controller method for creating an institution
exports.createInstitution = async (req, res) => {
    try {
      const result = await setupService.createInstitution(req.body);
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
