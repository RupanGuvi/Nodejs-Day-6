import jwt from "jsonwebtoken";
import User from "../Models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

export const authMiddleware = async (req, res, next) => {
  //const token = req.header("Authorization"); // 1st method
  const token = req.headers.authorization?.split(" ")[1]; // split(' ') [1] => bearer token

  if (!token) {
    return res.status(401).json({ message: "Token Missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Middleware for admin functionalites

export const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === "Admin") {
    next();
  } else {
    res
      .status(402)
      .json({ message: "Access Denied , Only Admin able to view" });
  }
};
