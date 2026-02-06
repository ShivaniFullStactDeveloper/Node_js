const service = require("./institutionService");

// Setup institution 
exports.setupInstitution = async (req, res) => {
  // Call service to handle full institution setup logic
  const result = await service.setupInstitution(req.body);

  // Send success response after setup completion
  res.status(201).json({
    success: true,
    message: "Institution setup completed",
    data: result
  });
};
