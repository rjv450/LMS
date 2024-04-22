import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
  updateDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["active", "inactive", "archived"],
    default: "active",
  },
  data: {
    type: [Schema.Types.Mixed],
    default: [],
  },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
