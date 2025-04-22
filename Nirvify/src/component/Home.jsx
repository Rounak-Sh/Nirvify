import React, { useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import DisplayHome from "./DisplayHome";
import DisplayPodcast from "./DisplayPodcast";
import { useContext } from "react";
import Navbar from "./Navbar";
import { PlayerControl } from "../playerLogic/PlayerControls";

const Home = ({ isLoggedIn, setIsLoggedIn }) => {
  const { podcastData } = useContext(PlayerControl);
  const audioRef = useRef(null);

  const location = useLocation();
  const isPodcast = location.pathname.includes("podcast");
  const podcastId = isPodcast ? location.pathname.split("/").pop() : "";

  const handleLogout = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <div className="w-full m-2 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0">
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        handleLogout={handleLogout}
      />
      {podcastData.length > 0 ? (
        <Routes>
          <Route
            path="/"
            element={
              <DisplayHome audioRef={audioRef} isLoggedIn={isLoggedIn} />
            }
          />
          <Route
            path="/podcast/:id"
            element={
              <DisplayPodcast
                isLoggedIn={isLoggedIn}
                audioRef={audioRef}
                podcast={podcastData.find((x) => x._id === podcastId)}
              />
            }
          />
        </Routes>
      ) : null}
    </div>
  );
};

export default Home;
