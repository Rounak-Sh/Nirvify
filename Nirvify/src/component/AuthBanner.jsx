import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const AuthBanner = ({ message, onClose }) => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate("/signup");
    onClose();
  };

  const handleLoginClick = () => {
    navigate("/login");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="relative flex justify-center items-center bg-[#121212] h-[55%] w-[55%] rounded-lg shadow-lg bg-gradient-to-b from-gray-700 to-black">
        <div className="flex-1 flex justify-center items-center ml-10">
          <img
            src={assets.main_logo}
            alt="Nirvify logo"
            className="h-full rounded-l-lg"
          />
        </div>
        <div className="flex-1 text-center pr-10">
          <h2 className="text-3xl font-bold text-white mb-6 font-circular">
            {message}
          </h2>
          <button
            onClick={handleSignUpClick}
            className="mt-2 mb-4 w-1/3 py-2.5 bg-bianchigreen_dark text-black rounded-full font-medium text-lg hover:bg-bianchigreen">
            Sign up
          </button>
          <div className="text-base mt-3 text-gray-400">
            Already have an account?
            <button
              onClick={handleLoginClick}
              className="text-bianchigreen hover:underline">
              Log in
            </button>
          </div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <button
              onClick={onClose}
              className="text-base font-bold text-gray-400 hover:text-gray-200">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthBanner;
