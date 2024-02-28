import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import colors from "colors";
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
      unique: true,
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
      type: String,
      required: true,
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
    refreshToken: {
      type: String,
    },
  },
  {
    timestamp: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
  console.log("Password Hashed...".blud);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccToken = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      userName: this.userName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_SECRET_EXPIRY,
    }
  );
};

userSchema.methods.generateRefToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_SECRET_EXPIRY,
    }
  );
};
export const User = mongoose.model("User", userSchema);
