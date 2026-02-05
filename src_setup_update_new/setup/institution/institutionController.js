const service = require("./institutionService");

exports.setupInstitution = async (req, res) => {
  try {
    const result = await service.setupInstitution(req.body);

    res.status(201).json({
      success: true,
      message: "Institution setup completed",
      data: result
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};
