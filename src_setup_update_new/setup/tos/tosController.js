const service = require("./tosService");

exports.createTos = async (req, res) => {
  try {
    const data = await service.createTos(req.body);
    res.status(201).json({ success: true, data });
  } catch (e) {
    res.status(400).json({ success: false, error: e.message });
  }
};

exports.getActiveTos = async (req, res) => {
  try {
    const data = await service.getActiveTos(req.query);
    res.json({ success: true, data });
  } catch (e) {
    res.status(400).json({ success: false, error: e.message });
  }
};

exports.acceptTos = async (req, res) => {
  try {
    await service.acceptTos(req.body);
    res.json({ success: true, message: "ToS accepted" });
  } catch (e) {
    res.status(400).json({ success: false, error: e.message });
  }
};
