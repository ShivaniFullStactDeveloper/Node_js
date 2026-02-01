const subscriptionService = require('./subscriptionService');

exports.activateSubscription = async (req, res) => {
  try {
    const data = await subscriptionService.activateSubscription(req.body);
    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};
