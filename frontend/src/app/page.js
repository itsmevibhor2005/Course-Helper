"use client";

import React, { use, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ShimmerButton from "@/components/ui/shimmer-button";
import Courses from "@/app/sample/sampledata.json";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";

const Home = () => {
  const originalCourses = Courses
  console.log(originalCourses)
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState(originalCourses);

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
    if(searchQuery.trim() === "") {
    setCourses(originalCourses);}
  }
  , );
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div className="min-h-screen flex flex-col items-center p-10 bg-gradient-to-r from-blue-400 to-purple-500 text-white">
      <div className="fixed top-5 right-5">
        <Link href="/login">
          <ShimmerButton
            variant="contained"
            color="primary"
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Login
          </ShimmerButton>
        </Link>
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
      <List className="flex flex-col justify-center items-center flex-wrap w-[80vw] gap-4 rounded-md">
        {courses.map((course, index) => (
          <ListItem
            key={index}
            divider
            className="w-[100%] flex flex-col bg-[rgba(0,0,0,0.6)] hover:bg-[rgba(0,0,0,0.8)] rounded-md cursor-pointer relative"
          >
            <p className="text-white text-center text-xl">
              {course.CourseCode}
            </p>
            <ListItemText
              primary={course.CourseName}
              className="text-white text-center"
            />
            {/* Edit and Delete Buttons */}
            <div className="absolute right-4 top-[50%] transform -translate-y-[50%] flex gap-2">
              {/* Edit Button */}
              <button
                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
                onClick={() => handleEdit(course)}
              >
                <i className="text-xl">
                  <FaEdit />
                </i>
              </button>
              {/* Delete Button */}
              <button
                className="bg-red-500 text-white p-2 rounded-md hover:bg-red-700"
                onClick={() => handleDelete(course)}
              >
                <i className="text-xl">
                  <FaTrash />
                </i>
              </button>
            </div>
          </ListItem>
        ))}
      </List>
      <div className="fixed bottom-5 right-5">
        {/* Add Course Button */}
        <ShimmerButton
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
        >
          Add Course
        </ShimmerButton>

        {/* Dialog for Adding Course */}
        <Dialog
          open={open}
          onClose={handleClose}
          className="rounded-md bg-[rgba(0,0,0,0.6)]"
        >
          <DialogTitle>Add New Course</DialogTitle>
          <DialogContent>
            <form className="flex flex-col gap-4">
              {/* Course Code Input */}
              <TextField label="Course Code" variant="outlined" fullWidth />
              {/* Course Name Input */}
              <TextField label="Course Name" variant="outlined" fullWidth />
              {/* Course Description Input */}
              <TextField
                label="Course Description"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
              />
            </form>
          </DialogContent>
          <DialogActions>
            {/* Cancel Button */}
            <Button
              onClick={handleClose}
              color="secondary"
              className="hover:bg-red-100"
            >
              Cancel
            </Button>
            {/* Add Button */}
            <Button
              variant="contained"
              color="primary"
              className="bg-green-500 hover:bg-green-600"
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
