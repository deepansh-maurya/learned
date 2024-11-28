import express from 'express';
import Question from '../models/Question.js';
import authenticateToken from '../middleware/authenticateToken.js';

const router = express.Router();

// Get all questions
router.get('/',authenticateToken, async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new question
router.post('/', authenticateToken, async (req, res) => {
  try {
    const question = new Question({
      text: req.body.text,
      userId: req.user.id,
    });

    const savedQuestion = await question.save();
    res.status(201).json(savedQuestion);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});


export default router;
