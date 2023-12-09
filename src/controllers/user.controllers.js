
import { ApiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { user } from '../models/user.model.js';
import { ApiResponse } from '../utils/apiResponse.js'
import uploadOnCloudinary from '../utils/cloudinary.js'

const registerUser = asyncHandler(async (req, res, next) => {

    // get user details from frontend
    const { username, email, password, fullname } = req.body;

    console.log("data: ", username, email, password, fullname);

    // validation - not empty

    if ([fullname, email, username, password].some((field) => !field || field.trim() === "")) {
        throw new ApiError(400, 'All fields are required!');
    }

    //  check if user already exists: username , email

    const existedUser = await user.findOne({
        $or: [
            { username: { $regex: new RegExp(username, 'i') } },
            { email: { $regex: new RegExp(email, 'i') } }
        ]
    });

    if (existedUser) {
        throw new ApiError(409, 'User with email or username already exists');
    }
    // check for images, check for avater
    // console.log(existedUser);

    // console.log('req.files:', req.files);


    const avatarLocalPath = req.files['avatar'][0].path;
    const coverImgLocalPath = req.files['coverImage'] ? req.files['coverImage'][0].path : undefined;

    // console.log('avatarLocalPath: ', avatarLocalPath);
    // console.log('coverImgLocalPath: ', coverImgLocalPath);


    // upload them to Cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImgLocalPath);

    if (!avatar || !coverImage) {
        console.error('Cloudinary upload failed. Avatar:', avatar, 'Cover Image:', coverImage);
        throw new ApiError(400, 'Both avatar and cover image files are required and must be valid!');
    }


    // create user object-create entry in db
    const newUser = await user.create({
        fullname,
        avatar: avatar.url,
        CoverImg: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase(),
    })

    const createdUser = await user.findById(newUser._id).select(
        "-password -refreshToken"
    );

    if (!createdUser) {
        throw new ApiError(500, 'Somthing went wrong while registering the user');
    }

    // remove password and refresh token field from responce
    
    //  return responce

    return res.status(200).json(
        new ApiResponse(200, createdUser, "user register successfully")
    )
});

const login = asyncHandler(async (req, res, next) => {
    const { email } = req.body;

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
