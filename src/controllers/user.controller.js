import { asyncHandler } from "../utils/asyncHnadler.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import { User } from "../models/user.models.js";
import { uploadFileToCloud } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import nodemailer from "nodemailer";

const registerUser = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    userName,
    email,
    mobileNo,
    password,
    address,
    isApproved,
    vehicleSelection,
    registrationDate,
    refreshToken,
  } = req.body;

  if (
    [
      firstName,
      lastName,
      userName,
      email,
      mobileNo,
      password,
      address,
      isApproved,
      vehicleSelection,
      registrationDate,
    ].some((field) => {
      field.trim() === "";
    })
  ) {
    throw new Api(400, "All Fields is required");
  }

  const isExistedUser = User.findOne({
    $or: [{ userName }],
  });

  // if (isExistedUser) {
  //   throw new ApiErrors(409, "User with  User Name are already Exist");
  // }

  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const fitnessCertificateLocalPath = req.files?.fitnessCertificate?.[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiErrors(400, "Avatar file is required");
  }

  const avatar = await uploadFileToCloud(avatarLocalPath);
  const fitnessCertificate = await uploadFileToCloud(
    fitnessCertificateLocalPath
  );

  // console.log(avatar);
  // console.log(fitnessCertificate);

  const user = await User.create({
    firstName,
    lastName,
    userName: userName.toUpperCase(),
    email,
    mobileNo,
    password,
    address,
    isApproved,
    vehicleSelection,
    registrationDate,
    picture: avatar,
    uploadedFitnessCertificate: fitnessCertificate,
  });

  const isUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!isUser) {
    throw new ApiErrors(500, "Some thing went wrong while registering User");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, isUser, "User registered Successfully"));
});

export const updateUserApproval = asyncHandler(async (req, res) => {
  const { id } = req.params; // get the user id from request parameters
  const { isApproved } = req.body; // get the new approval status from request body

  // find the user by id and update
  const user = await User.findByIdAndUpdate(id, { isApproved }, { new: true });

  if (user) {
    user.isApproved = true;
    await user.save();

    // send email to user
    let transporter = await nodemailer.createTransport({
      service: "yahoo",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    let mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: user.email,
      subject: "Your account has been approved",
      text: "Congratulations, your account has been approved by the admin.",
    };

    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.json({ message: "User approved and email sent" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { userName, password } = req.body;

  const user = await User.findOne({ userName });

  if (user && (await user.isPasswordCorrect(password))) {
    const accessToken = user.generateAccToken();
    const refreshToken = user.generateRefToken();

    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      mobileNo: user.mobileNo,
      address: user.address,
      email: user.email,
      picture: user.picture,
      isApproved: user.isApproved,
      uploadedFitnessCertificate: user.uploadedFitnessCertificate,
      vehicleSelection: user.vehicleSelection,
      registrationDate: user.registrationDate,
      accessToken,
      refreshToken,
    });
  } else {
    res.status(401);
    throw new Error("Invalid username or password");
  }
});

export { registerUser };
