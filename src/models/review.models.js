import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    nstructorId: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      default: new Date(),
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamp: true }
);

export const Review = mongoose.model("Review", reviewSchema);
