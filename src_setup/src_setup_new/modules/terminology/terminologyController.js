const terminologyService = require('./terminologyService');

exports.loadDefaults = async (req, res) => {
  try {
    const { institution_id } = req.body;

    if (!institution_id) {
      return res.status(400).json({
        success: false,
        message: 'institution_id is required'
      });
    }

    const data = await terminologyService.loadDefaults(institution_id);

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

exports.getInstitutionTerminology = async (req, res) => {
  try {
    const { institutionId } = req.params;
    const data =
      await terminologyService.getInstitutionTerminology(institutionId);

    res.json({ success: true, data });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};
