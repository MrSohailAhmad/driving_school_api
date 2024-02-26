import mongoose from "mongoose";

const instructorSchema = mongoose.Schema(
  {
    instructorName: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    licenseNumber: {
      type: String,
      required: true,
    },
    schoolId: {
      type: String,
      required: true,
    },
    registrationDate: {
      type: String,
      default: new Date(),
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
    },
  },
  { timestamp: true }
);

export const Instructor = mongoose.model("Instructor", instructorSchema);
