import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiErrors } from "../utils/ApiError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../db.js";

export const register = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiErrors(400, "Please provide name, email and password");
  }

  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userExists) {
    throw new ApiErrors(400, "User already exists");
  }

  const user = await prisma.user.create({
    data: {
      email,
      password: bcrypt.hashSync(password, 12),
    },
  });

  const returnUser = {
    id: user.id,
    email: user.email,
  };

  return res
    .status(201)
    .json(new ApiResponse(201, returnUser, "User registered successfully"));
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiErrors(400, "Please provide email and password");
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  const isPasswordMatch = user && bcrypt.compareSync(password, user.password);

  if (!isPasswordMatch) {
    throw new ApiErrors(400, "Invalid credentials");
  }

  if (!user) {
    throw new ApiErrors(400, "Invalid credentials");
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  const returnUser = {
    id: user.id,
    email: user.email,
    token,
  };

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("token", token, options)
    .json(new ApiResponse(200, returnUser, "User logged in successfully"));
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});
