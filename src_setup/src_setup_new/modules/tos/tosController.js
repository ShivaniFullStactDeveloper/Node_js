const tosService = require('./tosService');

exports.acceptTos = async (req, res) => {
  try {
    const { institution_id } = req.body;

    if (!institution_id) {
      throw new Error('institution_id is required');
    }

    const data = await tosService.acceptTos(institution_id);

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
