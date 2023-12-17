import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const  verfieyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookie?.accessToken || req.header('Authorization')?.replace("Bearer", "");

        if (!token) {
            return new ApiError(401, 'unauthorized request')
        }

        const decordToken = jwt.verfiey(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decordToken?._id).select('-password -refreshToken')

        if (!user) {
            throw new ApiError(401, 'invalid Access Token')
        }

        req.user = user;

        next();
    } catch (error) {
       throw new ApiError(401, error?.message ||"invalid access token")
    }
})

export default verfieyJWT