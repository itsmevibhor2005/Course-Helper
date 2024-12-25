"use client";

import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ShimmerButton from "@/components/ui/shimmer-button";

const Home = () => {
  const originalCourses = [
    "ESC111",
    "ESC112",
    "ESC113",
    "MTH111",
    "MTH112",
    "MTH113",
    "PHY111",
    "PHY112",
    "PHY113",
    "CHM111",
    "CHM112",
    "CHM113",
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState(originalCourses);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const filteredCourses = originalCourses.filter((course) =>
        course.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setCourses(filteredCourses);
    } else {
      setCourses(originalCourses);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 text-white p-4">
      <h1 className="text-7xl font-bold mb-6">COURSE HELPER</h1>
      <div className="flex items-center w-full max-w-xl mb-6">
        <div className="border-2 border-white rounded-md mr-2 w-full">
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
      <List className="flex flex-row justify-center items-center flex-wrap w-[80vw] gap-4 rounded-md shadow-lg">
        {courses.map((course, index) => (
          <ListItem
            key={index}
            divider
            className="w-1/5 bg-[rgba(0,0,0,0.6)] hover:bg-[rgba(0,0,0,0.8)] rounded-md cursor-pointer"
          >
            <ListItemText primary={course} className="text-white text-center" />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Home;
