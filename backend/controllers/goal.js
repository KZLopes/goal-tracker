const asyncHandler = require('express-async-handler');

module.exports = {
  getGoals: asyncHandler(async (req, res) => {
    res.json({ message: 'Get Goals' });
  }),

  setGoal: asyncHandler(async (req, res, next) => {
    try {
      if (!req.body.text) {
        res.status(400);
        throw new Error('Please Add a Text in the TExt Field');
      }
    } catch (err) {
      next(err);
    }
  }),

  updateGoal: asyncHandler(async (req, res) => {
    res.json({ message: 'Update Goals' });
  }),

  deleteGoal: asyncHandler(async (req, res) => {
    res.json({ message: 'Deleted Goals' });
  }),
};
