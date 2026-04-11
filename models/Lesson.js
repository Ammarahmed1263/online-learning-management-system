import { Schema, model } from "mongoose";

const lessonSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Lesson title is required"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Lesson content is required"],
      trim: true,
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },
    instructorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const Lesson = model("Lesson", lessonSchema);
export default Lesson;
