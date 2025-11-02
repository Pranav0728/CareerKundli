import mongoose from "mongoose";
const { Schema, models, model } = mongoose;

const RoadmapStepSchema = new Schema(
  {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    duration: { type: String, default: "" },
    outcome: { type: String, default: "" },
  },
  { _id: false }
);

const ReportSchema = new Schema({
  resumeText: { type: String, required: true },
  analysis: {
    skills: { type: [String], default: [] },
    roles: { type: [String], default: [] },
    education: { type: [String], default: [] },
    achievements: { type: [String], default: [] },
  },
  prediction: {
    next_roles: { type: [String], default: [] },
    growth_score: { type: Number, default: 0 },
    skill_gaps: { type: [String], default: [] },
  },
  horoscope: { type: String, default: "" },
  roadmap: {
    short_term: { type: [RoadmapStepSchema], default: [] },
    mid_term: { type: [RoadmapStepSchema], default: [] },
    long_term: { type: [RoadmapStepSchema], default: [] },
  },
}, { timestamps: true });

export default models.Report || model("Report", ReportSchema);