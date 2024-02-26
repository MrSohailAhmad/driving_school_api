import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      unique: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobileNo: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    picture: {
      path: {
        type: String,
        required: true,
      },
    },
    isApproved: {
      type: Boolean,
      default: false,
      required: true,
    },
    uploadedFitnessCertificate: {
      type: String,
      required: true,
    },
    vehicleSelection: {
      type: String,
      required: true,
      enum: {
        values: ["Car", "Bike"],
        message: "{VALUE} is not supported",
      },
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

export const User = mongoose.model("User", userSchema);
