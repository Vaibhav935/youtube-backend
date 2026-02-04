import { UserModel } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import bcrypt from "bcrypt";

const generateRefreshAndAccessToken = async (userId) => {
  try {
    const user = await UserModel.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken();
    user.save({
      validateBeforeSave: true,
    });

    return { refreshToken, accessToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token."
    );
  }
};

const registerUserController = asyncHandler(async (req, res) => {
  // get user details form frontend
  // validation - not empty
  // check if user already exists - username, email
  // check for image, check for avatar
  // upload them to cloudinary avatar
  // create user object - create entry in database
  // remove password and refresh token field from response
  // check for user creation
  // return res

  try {
    const { username, fullname, email, password } = req.body;

    if (!username || !fullname || !email || !password) {
      throw new ApiError(400, "All fields are required");
    }

    if (
      [username, fullname, email, password].some(
        (field) => field?.trim() === ""
      )
    ) {
      throw new ApiError(400, "All fields are required");
    }

    const existedUser = await UserModel.findOne({
      $or: [{ username }, { email }],
    });

    if (existedUser) {
      throw new ApiError(409, "User with email or username already exists");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath = "";
    if (
      req.files &&
      Array.isArray(req.files.coverImage) &&
      req.files.coverImage.length > 0
    ) {
      coverImageLocalPath = req.files.coverImage[0].path;
    }

    if (!avatarLocalPath) {
      throw new ApiError(400, "Avatar file is required");
    }

    const avatarRes = await uploadOnCloudinary(avatarLocalPath);
    const coverImageRes = await uploadOnCloudinary(coverImageLocalPath);

    if (!avatarRes) {
      throw new ApiError(400, "Avatar file is required, cloudinary");
    }

    const newUser = await UserModel.create({
      username: username.toLowerCase(),
      fullname,
      email,
      password,
      avatar: avatarRes.url,
      coverImage: coverImageRes?.url || "",
    });

    const createdUser = await UserModel.findById(newUser._id).select(
      "-password -refreshToken"
    );

    if (!createdUser) {
      throw new ApiError(
        500,
        "Something went wrong while registering the user"
      );
    }

    return res
      .status(201)
      .json(new ApiResponse(200, createdUser, "User registered successfully"));
  } catch (error) {
    console.log("error in register api, ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error, error in register API",
      error,
    });
  }
});

const loginUserController = asyncHandler(async (req, res) => {
  try {
    // take data form req body
    // validate using one - username or email
    // find the user
    // password check
    // generate access and refresh token
    // send cookie

    const { email, username, password } = req.body;

    if (!username || !password) {
      throw new ApiError(400, "username or password is required.");
    }

    const existingUser = await UserModel.findOne({
      $or: [{ username }, { password }],
    });

    if (!existingUser) {
      throw new ApiError(404, "User does not exist.");
    }

    // const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    const isPasswordValid = await existingUser.isPasswordCorrect(password);

    if (!isPasswordValid) throw new ApiError(401, "Invalid User Credentials");

    const { accessToken, refreshToken } = await generateRefreshAndAccessToken(
      existingUser._id
    );

    const loggedInUser = await UserModel.findById(existingUser._id).select(
      "-password -refreshToken"
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("refreshToken", refreshToken, options)
      .cookie("accessToken", accessToken, options)
      .json(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In successfully"
      );
  } catch (error) {
    console.log("error in login api, ", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error, error in login API",
      error,
    });
  }
});

export { registerUserController };
