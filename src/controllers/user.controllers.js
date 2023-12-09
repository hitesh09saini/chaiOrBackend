
import { asyncHandler } from '../utils/asyncHandler.js';

const registerUser = asyncHandler(async (req, res, next) => {
    res.status(200).json({
        message: "ok register",
    });
});

const login = asyncHandler(async (req, res, next) => {
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
