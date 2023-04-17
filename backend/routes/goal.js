const express = require('express');
const router = express.Router();
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require('../controllers/goal');
const { protect } = require('../middleware/auth');

router.get('/', protect, getGoals);
router.post('/', protect, setGoal);
router.put('/:id', protect, updateGoal);
router.delete('/:id', protect, deleteGoal);

module.exports = router;
