
import { ApiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { user } from '../models/user.model.js';
import {ApiResponse} from '../utils/apiResponse.js'

import uploadOnCloudinary, { uploadOnCloudinary } from '../utils/cloudinary.js'
const registerUser = asyncHandler(async (req, res, next) => {

    // get user details from frontend
    const { username, email, password, fullname } = req.body;

    console.log("data: ", username, email, password, fullname);

    // validation - not empty

    if (
        [fullname, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, 'All fields are required !')
    }

    //  check if user already exists: username , email

    const existedUser = user.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, 'User with email or username already exists')
    }
    // check for images, check for avater

    const avtarLocalPath = req.files?.avatar[0]?.path;
    const coverImgLocalPath = req.files?.coverImage[0]?.path;

    if (!avtarLocalPath) {
        throw new ApiError(400, 'avatar file is required !')
    }

    // upload them to cloudinary

    const avatar = await uploadOnCloudinary(avtarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImgLocalPath);

    if (!avatar) {
        throw new ApiError(400, 'avatar file is required !')
    }

    // create user object-create entry in db
    const newUser = await user.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase(),
    })

    const createdUser = await user.findById(newUser._id).select(
        "-password -refreshToken"
    );

    if(!createdUser){
        throw new ApiError(500, 'Somthing went wrong while registering the user');
    }

    newUser.save();
    return res.status(200).json(
        new ApiResponse(200, createdUser,"user register successfully")
    )

    // remove password and refresh token field from responce

    //  return responce

    res.status(200).json({
        message: "ok register",
        data: `${email}`
    });
});

const login = asyncHandler(async (req, res, next) => {
    console.log("data: ", email);
    res.status(200).json({
        message: "login get",
    });
});


const logout = asyncHandler(async (req, res, next) => {
    res.status(200).json({
        message: "ok",
    });
});


export { registerUser, login, logout };
