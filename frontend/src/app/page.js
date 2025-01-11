"use client";

import React, { use, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ShimmerButton from "@/components/ui/shimmer-button";
import Courses from "@/app/sample/sampledata.json";
 import { ToastContainer, toast } from "react-toastify";
import {
  Box,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";

const Home = () => {
  const [token, setToken] = useState(null);
  const router = useRouter();
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = Cookies.get("token");
      if (token) {
        setToken(token);
        const user= Cookies.get("user");
        setEmail(user);
      }
    }
  }, []);

  const handleLogout = async () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setToken(null);
    toast.success("Logged out successfully");
    router.push("/");
  };
  const [originalCourses, setOriginalCourses] = useState([]);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course`);
        
        setOriginalCourses(response.data.data);

      } catch (err) {
        toast.error(error.response.data.message);
      }
    };
    fetchCourses();
  }, []);
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState(
    originalCourses.map((course) => ({ ...course, showDescription: false }))
  );

  const [error, setError] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const filteredCourses = originalCourses.filter((course) =>
        course.CourseCode.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setCourses(filteredCourses);
    } else {
      setCourses(originalCourses);
    }
  };

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setCourses((prevCourses) =>
        originalCourses.map((course, index) => ({
          ...course,
          showDescription: prevCourses[index]?.showDescription || false,
        }))
      );
    }
  }, [searchQuery, originalCourses]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDescription = (clickedCourse) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.CourseCode === clickedCourse.CourseCode
          ? { ...course, showDescription: !course.showDescription }
          : course
      )
    );
  };
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [courseDescription, setcourseDescription] = useState("");
  const [courseCredit, setCourseCredit] = useState("");

  const handleAddCourse = async () => {
    const CourseCode = courseCode;
    const CourseName = courseName;
    const CourseDescription = courseDescription;
    const CourseCredit = courseCredit;

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/add`,
        {
          CourseCode,
          CourseName,
          CourseDescription,
          CourseCredit: parseInt(CourseCredit),
        },
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      toast.success("Course added successfully");
      setOriginalCourses((prevCourses) => [...prevCourses, response.data.data]);
      setCourses((prevCourses) => [
        ...prevCourses,
        { ...response.data.data, showDescription: false },
      ]);
      setCourseName("");
      setCourseCode("");
      setcourseDescription("");
      setCourseCredit("");
      handleClose();
    } catch (err) {
      toast.error(error.response.data.message);
    }
  };

  const handleDelete = async (course) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/delete/${course.id}`,
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      toast.success("Course deleted successfully");
      setOriginalCourses((prevCourses) =>
        prevCourses.filter((c) => c.id !== course.id)
      );
      setCourses((prevCourses) =>
        prevCourses.filter((c) => c.id !== course.id)
      );
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleEdit = (course) => {
    setSelectedCourse(course);
    setCourseName(course.CourseName);
    setCourseCode(course.CourseCode);
    setcourseDescription(course.CourseDescription);
    setCourseCredit(course.CourseCredit);
    setOpenEditDialog(true);
  };

  const handleEditSubmit = async () => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/update/${selectedCourse.id}`,
        {
          CourseName: courseName,
          CourseCode: courseCode,
          CourseDescription: courseDescription,
          CourseCredit: parseInt(courseCredit),
        },
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      toast.success("Course edited successfully");
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.id === selectedCourse.id ? response.data.data : course
        )
      );
      setOpenEditDialog(false);
    } catch (error) {
      setError(error.response.data.message);
      toast.error(error.response.data.message);
      
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-10 bg-gradient-to-r from-blue-400 to-purple-500 text-white">
      <ToastContainer />
      <div className="fixed top-5 right-5 flex gap-2">
        {token ? (
          <>
            <span className="text-2xl text-white pt-3">{email}</span>
            <ShimmerButton
              variant="contained"
              color="primary"
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={handleLogout}
            >
              Logout
            </ShimmerButton>
          </>
        ) : (
          <>
            <Link href="/login">
              <ShimmerButton
                variant="contained"
                color="primary"
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Login
              </ShimmerButton>
            </Link>
            <Link href="/register">
              <ShimmerButton
                variant="contained"
                color="primary"
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                Register
              </ShimmerButton>
            </Link>
          </>
        )}
      </div>
      <h1 className="text-7xl font-bold mb-10">COURSE HELPER</h1>
      <div className="flex items-center w-full max-w-xl mb-10">
        <div className="border-2 border-white rounded-md mr-2  w-full">
          <TextField
            id="search-bar"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="bg-[rgba(0,0,0,0.5)] rounded-sm"
            placeholder="Search for courses..."
            InputProps={{
              className: "text-white",
            }}
            InputLabelProps={{
              className: "text-white",
            }}
          />
        </div>
        <ShimmerButton
          background="rgba(13,8,72,1)"
          borderRadius="10px"
          className="h-[55px]"
          onClick={handleSearch}
        >
          Search
        </ShimmerButton>
      </div>
      <List
        sx={{ width: "80vw", display: "flex", flexDirection: "column", gap: 2 }}
      >
        {courses.map((course, index) => (
          <ListItem
            key={index}
            sx={{
              flexDirection: "column",
              backgroundColor: "rgba(0,0,0,0.6)",
              borderRadius: 1,
              cursor: "pointer",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
            }}
          >
            <Typography variant="h6" color="white" textAlign="center">
              {course.CourseCode}
            </Typography>
            <ListItemText
              primary={course.CourseName}
              sx={{
                color: "white",
                textAlign: "center",
              }}
            />
            <Typography>Credits: {course.CourseCredit}</Typography>

            <Typography
              onClick={() => handleDescription(course)}
              className="cursor-pointer underline hover:text-blue-300"
            >
              {course.showDescription ? "Hide Description" : "Show Description"}
            </Typography>
            <Box
              sx={{
                position: "absolute",
                right: 16,
                top: "50%",
                transform: "translateY(-50%)",
                display: "flex",
                gap: 1,
              }}
            >
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => handleEdit(course)}
              >
                <FaEdit />
              </Button>
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => handleDelete(course)}
              >
                <FaTrash />
              </Button>
            </Box>
            <Collapse in={course.showDescription} timeout="auto" unmountOnExit>
              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  backgroundColor: "rgba(0,0,0,0.8)",
                  borderRadius: 1,
                  color: "white",
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  Course Description:
                </Typography>
                <Typography variant="body2">
                  {course.CourseDescription}
                </Typography>
              </Box>
            </Collapse>
          </ListItem>
        ))}
      </List>
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Course</DialogTitle>
        <DialogContent>
          <TextField
            label="Course Name"
            variant="outlined"
            fullWidth
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Course Code"
            variant="outlined"
            fullWidth
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Course Description"
            variant="outlined"
            fullWidth
            value={courseDescription}
            onChange={(e) => setcourseDescription(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Course Credit"
            variant="outlined"
            fullWidth
            value={courseCredit}
            onChange={(e) => setCourseCredit(e.target.value)}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} color="primary">
            Edit
          </Button>
        </DialogActions>
      </Dialog>
      <div className="fixed bottom-5 right-5">
        <ShimmerButton
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
        >
          Add Course
        </ShimmerButton>
        <Dialog
          open={open}
          onClose={handleClose}
          className="rounded-md bg-[rgba(0,0,0,0.6)]"
        >
          <DialogTitle>Add New Course</DialogTitle>
          <DialogContent>
            <form className="flex flex-col gap-4">
              <TextField
                label="Course Code"
                variant="outlined"
                fullWidth
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
              />
              <TextField
                label="Course Name"
                variant="outlined"
                fullWidth
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
              />
              <TextField
                label="Course Credit"
                variant="outlined"
                fullWidth
                value={courseCredit}
                onChange={(e) => setCourseCredit(e.target.value)}
              />
              <TextField
                label="Course Description"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                value={courseDescription}
                onChange={(e) => setcourseDescription(e.target.value)}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              color="secondary"
              className="hover:bg-red-100"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              className="bg-green-500 hover:bg-green-600"
              onClick={handleAddCourse}
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Home;
