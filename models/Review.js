import { Schema, model } from "mongoose";

const reviewSchema = new Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: false,
      trim: true,
    },

  },
  {
    timestamps: true,
  },
);

reviewSchema.index({ student: 1, course: 1 }, { unique: true });

reviewSchema.statics.calcAverageRatings = async function (courseId) {
  const stats = await this.aggregate([
    { $match: { course: courseId } },
    {
      $group: {
        _id: "$course",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  if (stats.length > 0) {
    await model("Course").findByIdAndUpdate(courseId, {
      numReviews: stats[0].nRating,
      averageRating: Math.round(stats[0].avgRating * 10) / 10,
    });
  } else {
    await model("Course").findByIdAndUpdate(courseId, {
      numReviews: 0,
      averageRating: 0,
    });
  }
};

reviewSchema.post("save", function () {
  this.constructor.calcAverageRatings(this.course);
});

// For findByIdAndDelete and findOneAndDelete
reviewSchema.post(/^findOneAnd/, async function (doc) {
  if (doc) {
    await doc.constructor.calcAverageRatings(doc.course);
  }
});

const Review = model("Review", reviewSchema);

export default Review;
