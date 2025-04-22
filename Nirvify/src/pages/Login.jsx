import React, { useState } from "react";
import axios from "axios";
import {
  EyeIcon,
  EyeSlashIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import API_URL from "../config/api.js";

const Login = ({ setIsLoggedIn }) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showAdminHint, setShowAdminHint] = useState(false);

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      setMessage(response.data.message);

      if (response.data.status) {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
        setMessage(response.data.message);
        const userRole = response.data.role;

        // Redirect based on role
        if (userRole === "admin") {
          setTimeout(() => {
            navigate("/admin");
          }, 2000);
        } else {
          setTimeout(() => {
            navigate("/");
          }, 1700);
        }
      }
    } catch (error) {
      setMessage(error.response?.data.message || "Invalid login credentials");
      console.log(error);
    }
  };

  const toggleAdminHint = () => {
    setShowAdminHint(!showAdminHint);
  };

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col justify-center items-center text-white font-circular">
      <div className="w-full max-w-md p-8">
        <div className="flex justify-center mb-5">
          <img src={assets.main_logo} alt="Nirvify Logo" className="h-28" />
        </div>

        <h1 className="text-center text-5xl font-bold py-2 mb-8">
          Log in to Nirvify
        </h1>

        <form
          className="space-y-4 flex flex-col items-center"
          onSubmit={handleLogin}>
          {message && (
            <div
              className={`mb-3 flex justify-center ${
                message.includes("successful")
                  ? "text-green-500"
                  : "text-red-500"
              }`}>
              <ExclamationCircleIcon className="h-6 w-6 mr-0.5" />
              {message}
            </div>
          )}

          <div className="w-full max-w-xs">
            <label className="block text-sm font-medium mb-1">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setMessage("");
              }}
              placeholder="name@domain.com"
              className="w-full px-4 py-2 bg-black border border-zinc-400 rounded placeholder:text-zinc-400 text-white hover:border-slate-50 focus:border-white"
            />
          </div>

          <div className="relative w-full max-w-xs">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type={passwordShown ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setMessage("");
              }}
              placeholder="Password"
              className="w-full mb-4 px-4 py-2 bg-black border border-zinc-400 rounded placeholder:text-zinc-400 text-white hover:border-slate-50 focus:border-white"
            />
            <button
              type="button"
              className="absolute inset-y-9 -right-3 px-6 text-gray-400"
              onClick={() => setPasswordShown(!passwordShown)}>
              {passwordShown ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>

          <div className="w-full max-w-xs">
            <button
              type="submit"
              className="w-full bg-bianchigreen_dark hover:bg-bianchigreen transform transition-transform duration-100 hover:scale-105 hover:font-medium text-black font-medium py-2 mb-3 rounded-full">
              Login
            </button>
          </div>
        </form>

        <div className="text-center mt-6">
          <span className="text-sm text-zinc-400">Don't have an account? </span>
          <NavLink
            to="/signup"
            className="text-white text-sm underline hover:text-bianchigreen_dark">
            Sign up for Nirvify.
          </NavLink>
        </div>

        {/* Admin Hint Section */}
        <div className="mt-4 text-center relative">
          <button
            onClick={toggleAdminHint}
            className="text-gray-400 hover:text-white flex items-center justify-center mx-auto">
            <InformationCircleIcon className="h-5 w-5 mr-1" />
            <span className="text-xs">Admin Access</span>
          </button>

          {showAdminHint && (
            <div className="mt-2 p-3 bg-gray-800 rounded-md text-xs animate-fade-in">
              <p className="font-semibold text-bianchigreen_dark mb-1">
                Admin Credentials:
              </p>
              <p>
                Email: <span className="text-white">admin@nirvify.com</span>
              </p>
              <p>
                Password: <span className="text-white">admin123</span>
              </p>
            </div>
          )}
        </div>
      </div>

      <footer className="w-full text-center text-xs text-zinc-400 mt-8">
        <p>
          This site is protected by reCAPTCHA and the Google
          <a href="#" className="underline text-white ml-1">
            Privacy Policy
          </a>
          an
          <a href="#" className="underline text-white ml-1">
            Terms of Service
          </a>
          apply.
        </p>
      </footer>
    </div>
  );
};

export default Login;
