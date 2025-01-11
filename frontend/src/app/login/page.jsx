"use client";

import React, { useState } from "react";
import { TextField } from "@mui/material";
import ShimmerButton from "@/components/ui/shimmer-button";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";

function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [buttonDisabled, setButtonDisabled] = useState(false);
     const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
        {
          email,
          password,
        }
      );
      document.cookie = `token=${response.data.data.token}; path=/;`;
      Cookies.set("token", response.data.data.token);
      Cookies.set("user", response.data.data.email);
      router.push("/");
      toast.success("User logged in successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <ToastContainer/>
      <div className="w-[90%] max-w-md p-8 bg-[rgba(0,0,0,0.6)] shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          {loading ? "Processing" : "Login"}
        </h1>
        <form className="flex flex-col gap-6" onSubmit={handleLogin}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            required
            className="bg-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            className="bg-white"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500">{error}</p>}
          <ShimmerButton
            variant="contained"
            color="primary"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold"
            type="submit"
            fullWidth
          >
            {buttonDisabled ? "No Login" : "Login"}
          </ShimmerButton>
          <Link href="/" className="text-white text-center hover:underline">
            Back to Home
          </Link>
          <Link
            href="/register"
            className="text-white text-center hover:underline"
          >
            Register
          </Link>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
