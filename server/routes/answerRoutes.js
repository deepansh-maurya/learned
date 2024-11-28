import express from "express";
import Answer from "../models/Answer.js";
import Question from "../models/Question.js";
import authenticateToken from "../middleware/authenticateToken.js";

const router = express.Router();
router.get("/", authenticateToken, async (req, res) => {
  try {
    const answers = await Answer.find()
      .populate("questionId", "text") // Populate question details (fetching only the text field)
      .populate("userId", "fullName"); // Populate user details (fetching only the fullName field)

    console.log(answers);

    res.json(answers);
  } catch (err) {
    console.error("Error fetching answers:", err);
    res.status(500).json({ message: err.message });
  }
});

// Add a new answer
router.post("/", authenticateToken, async (req, res) => {
  try {
    console.log(req.user._id);

    // Ensure the referenced question exists
    const question = await Question.findById(req.body.questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    // Create a new answer, associating it with the authenticated user
    const answer = new Answer({
      text: req.body.text,
      questionId: req.body.questionId,
      userId: req.user.id // Link the answer to the authenticated user
    });

    const savedAnswer = await answer.save();
    res.status(201).json(savedAnswer);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});


router.get("/with-questions", async (req, res) => {
  try {
    const questionsWithAnswers = await Question.aggregate([
      { $sort: { createdAt: -1 } }, // Sort questions by the latest

      // Lookup for user who added the question
      {
        $lookup: {
          from: "users", // The User collection
          localField: "userId", // The field in Question referencing the User
          foreignField: "_id", // The field in User to match
          as: "userDetails"
        }
      },
      {
        $unwind: "$userDetails" // Unwind to make userDetails an object instead of an array
      },

      // Lookup for answers related to the question
      {
        $lookup: {
          from: "answers", // The Answer collection
          let: { questionId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$questionId", "$$questionId"] } } },
            { $sort: { likes: -1 } }, // Sort answers by likes in descending order

            // Lookup for user who added the answer
            {
              $lookup: {
                from: "users", // The User collection
                localField: "userId", // The field in Answer referencing the User
                foreignField: "_id", // The field in User to match
                as: "answerUserDetails"
              }
            },
            {
              $unwind: "$answerUserDetails" // Unwind to make answerUserDetails an object instead of an array
            }
          ],
          as: "answers"
        }
      }
    ]);

    console.log(questionsWithAnswers);

    res.json(questionsWithAnswers);
  } catch (err) {
    console.error("Error fetching questions with answers:", err);
    res.status(500).json({ message: err.message });
  }
});



router.post("/like", authenticateToken, async (req, res) => {
  try {
    const { id } = req.body;
    const userId = req.user.id._id;

    const answer = await Answer.findById(id);

    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }

    if (answer.likedBy.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You have already liked this answer" });
    }

    answer.likedBy.push(userId);
    answer.likes += 1;
    await answer.save();

    res
      .status(200)
      .json({
        success: true,
        message: "Like added successfully",
        likes: answer.likes
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
