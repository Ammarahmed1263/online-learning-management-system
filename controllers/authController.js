import jwt from "jsonwebtoken";
import User from "../models/User.js";
import AppError from "../utils/appError.js";
import jsend from "../utils/jsend.js";
import { userRoles } from "../utils/userRoles.js";

const createToken = (user) =>
    jwt.sign(
        { id: user._id, role: user.role, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "7d" },
    );

const pickPublicUserFields = (user) => ({
    id: user._id,
    userName: user.userName,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
});

export const register = async (req, res, next) => {
    const { userName, email, password, role } = req.body;

    if (role === userRoles.ADMIN) {
        return next(
            new AppError(
                "Admin role cannot be assigned during registration",
                403,
            ),
        );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return next(new AppError("Email already exists", 409));
    }

    const user = await User.create({ userName, email, password, role });
    const token = createToken(user);

    return res.status(201).json(
        jsend.success({
            token,
            user: pickPublicUserFields(user),
        }),
    );
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new AppError("Invalid email or password", 401));
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
        return next(new AppError("Invalid email or password", 401));
    }

    const token = createToken(user);

    return res.status(200).json(
        jsend.success({
            token,
            user: pickPublicUserFields(user),
        }),
    );
};

export const getMe = async (req, res, next) => {
    const user = await User.findById(req.user.id);
    if (!user) {
        return next(new AppError("User not found", 404));
    }

    return res.status(200).json(
        jsend.success({
            user: pickPublicUserFields(user),
        }),
    );
};
