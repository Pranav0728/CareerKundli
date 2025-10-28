import mongoose, { Schema, models, model } from "mongoose";

const ReportSchema = new Schema(
  {
    resumeText: { type: String, required: true },
    analysis: {
      skills: [String],
      roles: [String],
      education: [String],
      achievements: [String],
    },
    prediction: {
      next_roles: [String],
      growth_score: Number,
      skill_gaps: [String],
    },
    horoscope: { type: String },
  },
  { timestamps: true }
);

export default models.Report || model("Report", ReportSchema);