const service = require("./locationService");

exports.saveLocation = async (req, res) => {
  try {
    const data = await service.saveLocation(req.body);
    res.status(200).json({
      success: true,
      message: "Location & regional settings saved",
      data
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e.message
    });
  }
};
