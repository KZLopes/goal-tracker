const asyncHandler = require('express-async-handler');
const Goal = require('../models/Goal');

module.exports = {
  getGoals: asyncHandler(async (req, res) => {
    const goals = await Goal.find();

    res.json(goals);
  }),

  setGoal: asyncHandler(async (req, res, next) => {
    try {
      if (!req.body.title) {
        res.status(400);
        throw new Error('Please Add a Text in the TExt Field');
      }
      const goal = await Goal.create({
        title: req.body.title,
      });
      res.json(goal);
    } catch (err) {
      next(err);
    }
  }),

  updateGoal: asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      res.status(400);
      throw new Error('Goal not found');
    }

    const updatedGoal = await Goal.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
        },
      },
      { new: true }
    );
    console.log(updatedGoal);
    res.json(updatedGoal);
  }),

  deleteGoal: asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      res.status(400);
      throw new Error('Goal not found');
    }

    goal.remove();
    res.json({ id: req.params.id });
  }),
};
