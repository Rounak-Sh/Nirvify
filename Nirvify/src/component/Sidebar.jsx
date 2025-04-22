import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import Player from "./Player";
import { useNavigate } from "react-router";
import { PlayerControl } from "../playerLogic/PlayerControls";
import AuthBanner from "./AuthBanner";

const Sidebar = ({ isLoggedIn, setIsLoggedIn }) => {
  const { audioRef, track, episodeData } = useContext(PlayerControl);
  const navigate = useNavigate();

  const [showAuthBanner, setShowAuthBanner] = useState(false);

  return (
    <>
      <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
        <div className="bg-[#121212] h-[16%] mb-1 rounded flex flex-col items-center">
          <div className="flex items-center pb-2 pl-5 cursor-pointer">
            <img className="w-40" src={assets.main_logo} alt="" />
          </div>
          <div className="gap-10 rounded h-[15%] inline-flex">
            <div
              onClick={() => navigate("/")}
              className="flex items-center gap-2  cursor-pointer">
              <img className="w-8" src={assets.home_icon} alt="" />
              <p className="text-2xl font-bold">Home</p>
            </div>
          </div>
        </div>

        <div className="bg-[#121212] h-[85%]">
          <div className="h-[85%] p-2 bg-[#242424] m-2 rounded font-semibold flex flex-col gap-1 mt-4">
            {episodeData.length !== 0 ? (
              <>
                <Player isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                <audio
                  ref={audioRef}
                  src={track ? track.audio : ""}
                  preload="auto"></audio>
              </>
            ) : (
              <p className="text-gray-400">No songs available to play</p>
            )}
          </div>

          <footer className="w-full text-center text-xs text-zinc-400 mt-5 mb-5">
            <p>
              This site is protected by reCAPTCHA and the Google
              <a href="#" className="underline text-white">
                Privacy Policy
              </a>
              and
              <a href="#" className="underline text-white">
                Terms of Service
              </a>
              apply.
            </p>
          </footer>
        </div>
      </div>
      {showAuthBanner && (
        <AuthBanner
          message={
            <span>
              Make a Nirvify account
              <br />
              to upload a podcast
            </span>
          }
          onClose={() => setShowAuthBanner(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
