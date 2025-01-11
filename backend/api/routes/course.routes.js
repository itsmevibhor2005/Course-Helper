import { Router } from "express";
import {
  addCourse,
  deleteCourse,
  getCourses,
  updateCourse,
} from "../controllers/course.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(getCourses);
router.route("/add").post(verifyJWT, addCourse);
router.route("/update/:id").put(verifyJWT, updateCourse);
router.route("/delete/:id").delete(verifyJWT, deleteCourse);

export default router;
