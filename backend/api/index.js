import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
  })
);

app.use(express.static("public"));
app.use(cookieParser());


import errorHandler from "./middlewares/errorHandle.middleware.js";
import { ApiErrors } from "./utils/ApiError.js";


dotenv.config();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

import authRoutes from "./routes/user.routes.js";
import courseRoutes from "./routes/course.routes.js";

app.use("/api/auth", authRoutes);
app.use("/api/course", courseRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use((req, res, next) => {
  const error = new ApiErrors(404, "Route not found");
  next(error);
});

app.use(errorHandler);
