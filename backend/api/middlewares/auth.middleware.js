import { ApiErrors } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import prisma from "../db.js";



export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.token || req.header("token")?.replace("Bearer ", "");
    if (!token) {
      throw new ApiErrors(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: {
        id: decodedToken.id,
      },
    });

    if (!user) {
      throw new ApiErrors(401, "Invalid Token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiErrors(401, error?.message || "Invalid token");
  }
});
