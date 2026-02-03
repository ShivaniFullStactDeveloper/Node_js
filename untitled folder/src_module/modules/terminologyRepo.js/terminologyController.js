// src/module/terminology/terminologyController.js
const service = require('./terminologyService');

module.exports = {
  seedTerminology,
  getTerminology,
};

async function seedTerminology(req, res, next) {
  try {
    await service.seedTerminology(req.body);

    res.status(201).json({
      success: true,
      message: 'Terminology seeded successfully',
    });
  } catch (err) {
    next(err);
  }
}

async function getTerminology(req, res, next) {
  try {
    const { institution_type, lang } = req.query;

    const data = await service.loadTerminology(
      institution_type,
      lang || 'en'
    );

    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}
