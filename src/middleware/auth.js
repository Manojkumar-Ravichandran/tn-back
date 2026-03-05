const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { errorResponse } = require("../utils/apiResponse");

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(" ")[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from token
            req.user = await User.findById(decoded.id).select("-password");

            return next();
        } catch (error) {
            console.error(error);
            return errorResponse(res, "Not authorized", 401);
        }
    }

    return errorResponse(res, "Not authorized, no token", 401);
};

const admin = (req, res, next) => {
    if (req.user && req.user.role === "Admin") {
        next();
    } else {
        return errorResponse(res, "Not authorized as an admin", 403);
    }
};

module.exports = { protect, admin };