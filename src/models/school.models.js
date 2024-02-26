import mongoose from "mongoose";

const schoolSchema = mongoose.Schema(
  {
    schoolName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    appreovalStatus: {
      type: String,
      required: true,
    },
    registrationDate: {
      type: String,
      default: new Date(),
      required: true,
    },
  },
  {
    timestamp: true,
  }
);

export const School = mongoose.model("School", schoolSchema);
