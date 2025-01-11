import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiErrors } from "../utils/ApiError.js";
import prisma from "../db.js";

export const addCourse = asyncHandler(async (req, res) => {
  const { CourseName, CourseDescription, CourseCode, CourseCredit } = req.body;

  if (!CourseName || !CourseDescription || !CourseCode || !CourseCredit) {
    throw new ApiErrors(400, "Please provide name, description and code");
  }

  const course = await prisma.courses.create({
    data: {
      CourseName,
      CourseDescription,
      CourseCode,
      CourseCredit,
      creatorId: req.user.id,
    },
  });
  await prisma.user.update({
    where: { id: req.user.id },
    data: {
      courses: {
        connect: { id: course.id }, // Add the course ID to the courses array
      },
    },
  });

  return res
    .status(201)
    .json(new ApiResponse(201, course, "Course added successfully"));
});

export const getCourses = asyncHandler(async (req, res) => {
  const courses = await prisma.courses.findMany({
    select: {
      id: true,
      CourseName: true,
      CourseDescription: true,
      CourseCode: true,
      CourseCredit: true,
    },
  });
  return res
    .status(200)
    .json(new ApiResponse(200, courses, "Courses retrieved successfully"));
});

export const deleteCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const course = await prisma.courses.findUnique({
    where: {
      id,
    },
  });
  if (!course) {
    throw new ApiErrors(404, "Course not found");
  }
  if (course.creatorId !== req.user.id) {
    throw new ApiErrors(403, "You are not authorized to delete this course");
  }
  await prisma.courses.delete({
    where: {
      id,
    },
  });
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Course deleted successfully"));
});

export const updateCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { CourseName, CourseDescription, CourseCode, CourseCredit } = req.body;
  if (!CourseName || !CourseDescription || !CourseCode || !CourseCredit) {
    throw new ApiErrors(400, "Please provide name, description and code");
  }
  const course = await prisma.courses.findUnique({
    where: {
      id,
    },
  });
  if (!course) {
    throw new ApiErrors(404, "Course not found");
  }
  if (course.creatorId !== req.user.id) {
    throw new ApiErrors(403, "You are not authorized to update this course");
  }
  const updatedCourse = await prisma.courses.update({
    where: {
      id,
    },
    data: {
      CourseName,
      CourseDescription,
      CourseCode,
      CourseCredit,
    },
  });
  return res
    .status(200)
    .json(new ApiResponse(200, updatedCourse, "Course updated successfully"));
});
