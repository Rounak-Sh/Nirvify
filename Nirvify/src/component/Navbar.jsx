import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { PlayerControl } from "../playerLogic/PlayerControls";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const { resetPlayer } = useContext(PlayerControl);

  axios.defaults.withCredentials = true;

  const handleLogout = () => {
    axios
      .get("http://localhost:3000/auth/logout")
      .then((res) => {
        if (res.data.status) {
          localStorage.setItem("isLoggedIn", "false");
          setIsLoggedIn(false);

          resetPlayer();

          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-full flex justify-between items-center font-semibold bg-[#121212]">
      <div className="flex items-center gap-2">
        <p
          onClick={() => navigate(-1)}
          className="w-10 bg-black p-2 ml-4 rounded-full cursor-pointer transition-transform duration-100 hover:scale-110">
          <ArrowLeftIcon />
        </p>
        <p
          onClick={() => navigate(1)}
          className="w-10 bg-black p-2 rounded-full cursor-pointer transition-transform duration-100 hover:scale-110">
          <ArrowRightIcon />
        </p>
      </div>

      <div className="flex items-center gap-7">
        {isLoggedIn ? (
          <p
            onClick={handleLogout}
            className="bg-white w-28 text-black font-bold text-[15px] p-3 pl-7 mr-10 rounded-3xl hidden md:block cursor-pointer transform transition-transform duration-100 hover:scale-105">
            Logout
          </p>
        ) : (
          <>
            <NavLink to="/signup">
              <p className="bg-white w-28 text-black font-bold text-[15px] p-3 pl-7 rounded-3xl hidden md:block cursor-pointer transform transition-transform duration-100 hover:scale-105">
                Sign up
              </p>
            </NavLink>
            <NavLink to="/login">
              <p className="w-20 py-1 mr-4 text-gray-50 px-5 rounded-2xl text-[15px] hidden md:block cursor-pointer transition-transform duration-100 hover:scale-105 hover:font-bold">
                Login
              </p>
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
