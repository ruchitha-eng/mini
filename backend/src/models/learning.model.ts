import mongoose, { Schema, Document } from "mongoose";

export interface ILearning extends Document {
  userId: mongoose.Types.ObjectId;
  videoId: string;
  youtubeUrl: string;
  title: string;
  summary: string;
  practiceQuestions: string[];
  quiz: Array<{
    question: string;
    options: string[];
    answer: string;
  }>;
  notes: Array<{
    time: string;
    text: string;
  }>;
  createdAt: Date;
}

const LearningSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    videoId: { type: String, required: true },
    youtubeUrl: { type: String, required: true },
    title: { type: String, default: "Untitled Video" },
    summary: { type: String, required: true },
    practiceQuestions: { type: [String], default: [] },
    quiz: [
      {
        question: { type: String, required: true },
        options: { type: [String], required: true },
        answer: { type: String, required: true },
      },
    ],
    notes: [
      {
        time: { type: String, required: true },
        text: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<ILearning>("Learning", LearningSchema);
