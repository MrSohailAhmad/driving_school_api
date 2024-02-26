import mongoose from "mongoose";

const bookingSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    instructorId: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      default: new Date(),
      required: true,
    },
    time: {
      type: String,
      default: new Date(),
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamp: true }
);

export const Booking = mongoose.Model("Booking", bookingSchema);
