import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Routes
import questionRoutes from './routes/questionRoutes.js';
import answerRoutes from './routes/answerRoutes.js';
import authRoutes from './routes/authRoutes.js'
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
await mongoose
  .connect('mongodb+srv://nerdeep:nerdeep@cluster0.vrq49ij.mongodb.net/communitySection')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB:', err));

// Use Routes
app.use('/api/questions', questionRoutes);
app.use('/api/answers', answerRoutes);
app.use("/api/auth", authRoutes);

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
