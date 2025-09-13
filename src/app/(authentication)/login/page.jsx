"use client";

import { FaGoogle, FaGithub } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useEffect, useState } from "react";
// import logo from "../../assets/synthera_logo.png";
// import shopImg from "../../assets/shop_img3.png";
import Image from "next/image";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const session = useSession();

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Invalid username or password!",
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Logged in successfully!",
        timer: 2000,
        showConfirmButton: false,
      });
      router.push("/");
    }
  };

  const handleSocialLogin = async (providerName) => {
    signIn(providerName);
  };

  useEffect(() => {
    if (session?.status == "authenticated") {
      router.push("/");
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome!",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  }, [session?.status]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-lg flex max-w-5xl w-full overflow-hidden">
        {/* Left Section */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-b from-blue-500 to-blue-700 text-white flex-col justify-center items-center p-8">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Manage Your Synthera Account Efficiently
          </h2>
          <p className="text-sm text-center mb-6">
            Access your Synthera dashboard to track AI-generated fashion
            collections, manage orders, and explore personalized analytics.
          </p>

          <Image
            src="/shop_img3.png"
            alt="Characters"
            width={384}
            height={384}
            className="w-96"
          />
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <div className="text-center">
            <Image
              src="/synthera_logo.png"
              width={176}
              height={44}
              className="mx-auto w-44"
              alt="logo"
            />
            <div className="mt-2 space-y-2">
              <h3 className="text-2xl font-bold sm:text-3xl text-black">
                Welcome Back
              </h3>
              <p className="text-gray-800 mb-3">Please login to your account</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              className="w-full p-3 text-black bg-[#F5F7F9] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-[#F5F7F9]"
              required
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full p-3 text-black bg-[#F5F7F9] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-[#F5F7F9]"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="flex justify-between text-sm mb-4">
              <span></span>
              <a href="#" className="text-blue-500 hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600"
            >
              Login
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-2 text-gray-400 text-sm">Or Login With</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          <div className="flex ">
            <button
              onClick={() => {
                handleSocialLogin("google");
              }}
              className="flex-1 cursor-pointer flex text-black items-center justify-center p-3 border-2 border-[#1E40AF] rounded-lg shadow-sm hover:bg-[#E0E7FF] hover:border-[#1C3A9B] transition duration-300"
            >
              <FaGoogle className="w-5 h-5 mr-2 text-red-500" />
              Google
            </button>
          </div>

          <p className="text-sm text-gray-500 text-center mt-6">
            Don’t have an account?{" "}
            <Link href="/register" className="text-blue-500 hover:underline">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
