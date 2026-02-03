
const userService = require('./userService');

module.exports = {
  createUser,
};

async function createUser(req, res, next) {
  try {
    const user = await userService.createUserAndAssignRole(
      req.body
    );

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
}
