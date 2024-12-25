"use client";

import React from "react";
import { TextField, Button } from "@mui/material";
import ShimmerButton from "@/components/ui/shimmer-button";
import Link from "next/link";

function LoginPage() {
  const handleLogin = () => {
    console.log("Login button clicked");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-[90%] max-w-md p-8 bg-[rgba(0,0,0,0.6)] shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Login
        </h1>
        <form className="flex flex-col gap-6">
          {/* Email Field */}
          <TextField
            type="email"
            variant="outlined"
            fullWidth
            required
            className="bg-white"
            placeholder="Email"
          />
          <TextField
            // label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            className="bg-white"
            placeholder="Password"
          />
          <ShimmerButton
            variant="contained"
            color="primary"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold"
            onClick={handleLogin}
            fullWidth
          >
            Login
          </ShimmerButton>
        <Link href="/" className="text-white text-center hover:underline">Back to Home
        </Link>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
