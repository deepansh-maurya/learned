import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema({
  text: { type: String, required: true },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true
  },
  likes: { type: Number, default: 0 },
  likedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

const Answer = mongoose.model("Answer", AnswerSchema);

export default Answer;
