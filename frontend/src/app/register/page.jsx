"use client";

import React, {useEffect, useState} from "react";
import { TextField, Button } from "@mui/material";
import ShimmerButton from "@/components/ui/shimmer-button";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

function SignUpPage() {
  const router = useRouter();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");

   const [buttonDisabled, setButtonDisabled] = useState(false);
   const [loading, setLoading] = useState(false);
  const handleSignUp = async(e) => {
     e.preventDefault();
    try { 
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`,
        {
          email,
          password,
        }
      );
      router.push("/login");

    } catch (error) {
      toast.error(error.response.data.message);
    } finally{
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <ToastContainer/>
      <div className="w-[90%] max-w-md p-8 bg-[rgba(0,0,0,0.6)] shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          {loading ? "Processing" : "Register"}
        </h1>
        <form className="flex flex-col gap-6">
          <TextField
            type="email"
            variant="outlined"
            fullWidth
            required
            className="bg-white"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            type="password"
            variant="outlined"
            fullWidth
            required
            className="bg-white"
            placeholder="Password"
            value={password}
            autoComplete="on"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500">{error}</p>}
          <ShimmerButton
            variant="contained"
            color="primary"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold"
            onClick={handleSignUp}
            fullWidth
          >
            {buttonDisabled ? "No Register" : "Register"}
          </ShimmerButton>
          <Link href="/" className="text-white text-center hover:underline">
            Back to Home
          </Link>
          <Link
            href="/login"
            className="text-white text-center hover:underline"
          >
            Login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
