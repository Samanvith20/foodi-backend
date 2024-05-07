import AsyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import jwt from "jsonwebtoken";

// Middleware function to verify JWT token
export const verifyJWT = AsyncHandler(async (req, res, next) => {
    try {
        // Extract token from cookies or authorization header
        const token = req.cookies?.accessToken || req.headers.authorization?.split(' ')[1];
        //console.log(token);

        // If no token found, throw Unauthorized error
        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        // Verify the token using the access token secret
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Token is invalid!" });
            }
            req.decoded = decoded;
            next(); // Move to the next middleware
        });
    } catch (error) {
        // If any error occurs during token verification or user retrieval, throw Unauthorized error
        next(new ApiError(401, error?.message || "Invalid access token"));
    }
});
