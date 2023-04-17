const asyncHandler = require('express-async-handler');
const Goal = require('../models/Goal');
const User = require('../models/User');

module.exports = {
  getGoals: asyncHandler(async (req, res) => {
    const goals = await Goal.find({ author: req.user.id });

    res.status(200).json(goals);
  }),

  setGoal: asyncHandler(async (req, res, next) => {
    try {
      if (!req.body.title) {
        res.status(400);
        throw new Error('Please add a title');
      }
      const goal = await Goal.create({
        title: req.body.title,
        author: req.user.id,
      });
      res.status(201).json(goal);
    } catch (err) {
      return next(err);
    }
  }),

  updateGoal: asyncHandler(async (req, res, next) => {
    try {
      const goal = await Goal.findById(req.params.id);

      if (!goal) {
        res.status(400);
        throw new Error('Goal not found');
      }

      const user = await User.findById(req.user.id);

      // Check for user
      if (!user) {
        res.status(401);
        throw new Error('User Not Found');
      }

      // Make sure Logged user matches the author
      if (goal.user.toString() !== user.id) {
        res.status(401);
        throw new Error('Usuario nao Autorizado');
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
      res.status(200).json(updatedGoal);
    } catch (err) {
      return next(err);
    }
  }),

  deleteGoal: asyncHandler(async (req, res) => {
    try {
      const goal = await Goal.findById(req.params.id);

      if (!goal) {
        res.status(400);
        throw new Error('Goal not found');
      }

      const user = await User.findById(req.user.id);

      // Check for User
      if (!user) {
        res.status(401);
        throw new Error('User Not Found');
      }

      // Make sure Logged user matches the author
      if (goal.user.toString() !== user.id) {
        res.status(401);
        throw new Error('Usuario nao Autorizado');
      }

      goal.remove();
      res.status(200).json({ id: req.params.id });
    } catch (err) {
      return next(err);
    }
  }),
};
