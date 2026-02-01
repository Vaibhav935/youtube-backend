import { UserModel } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUserController = asyncHandler( async (req, res) => {
  // get user details form frontend
  // validation - not empty
  // check if user already exists - username, email
  // check for image, check for avatar
  // upload them to cloudinary avatar
  // create user object - create entry in database
  // remove password and refresh token field from response
  // check for user creation
  // return res

  const { username, fullname, email, password } = req.body;

  if (
    [username, fullname, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = UserModel.findOne({
    $or: [{ username }, { email }],
  });

  if(existedUser){
    throw new ApiError(409, "User with email or username already exists")
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if(!avatarLocalPath){
    throw new ApiError(400, "Avatar file is required")
  }

  const avatarRes = await uploadOnCloudinary(avatarLocalPath);
  const coverImageRes = await uploadOnCloudinary(coverImageLocalPath);

  if(!avatarRes){
    throw new ApiError(400, "Avatar file is required, cloudinary")
  }

  const newUser = await UserModel.create({
    username: username.toLowerCase(),
    fullname,
    email,
    password,
    avatar: avatarRes.url,
    coverImage: coverImageRes?.url || "",
  })

  const createdUser = await UserModel.findById(newUser._id).select(
    "-password -refreshToken"
  )

  if(!createdUser){
    throw new ApiError(500, "Something went wrong while registering the user")
  }

  return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered successfully")
  )

});

export { registerUserController };
