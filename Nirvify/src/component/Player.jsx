import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { PlayerControl } from "../playerLogic/PlayerControls";
import AuthBanner from "./AuthBanner";

const Player = ({ isLoggedIn }) => {
  const {
    track,
    seekBar,
    seekBg,
    playStatus,
    play,
    pause,
    time,
    nextTrack,
    prevTrack,
    seekEpisode,
    episodeData,
  } = useContext(PlayerControl);

  const [showAuthBanner, setShowAuthBanner] = useState(false);

  const handlePlayPause = () => {
    if (isLoggedIn) {
      playStatus ? pause() : play();
    } else {
      setShowAuthBanner(true);
    }
  };

  const handlePrev = () => {
    if (isLoggedIn && currentIndex > 0) {
      prevTrack();
    } else if (!isLoggedIn) {
      setShowAuthBanner(true);
    }
  };

  const handleNext = () => {
    if (isLoggedIn && currentIndex < episodeData.length - 1) {
      nextTrack();
    } else if (!isLoggedIn) {
      setShowAuthBanner(true);
    }
  };

  const currentIndex = track
    ? episodeData.findIndex((item) => item._id === track._id)
    : 0;

  return (
    <>
      <div className="relative h-full w-full bg-gradient-to-b from-[#3a3a3a] via-[#0f0f0f] to-[#2b2b2b] flex flex-col justify-between rounded text-white p-1">
        {track ? (
          <>
            <div className="flex flex-col items-center gap-2 p-4">
              <img
                className="w-48 h-48 rounded"
                src={track.image}
                alt="Episode"
              />
              <p className="text-lg font-semibold mt-2">
                Episode No: {track.episodeNo}
              </p>
              <p className="text-xl text-center font-bold">{track.name}</p>
            </div>

            <div className="mt-2 w-[80%] text-justify mx-auto">
              <p className="text-sm">{track.desc.slice(0, 80)}..</p>
            </div>

            <div
              className={`flex flex-col items-center w-full gap-1 mt-6 p-2 player-controls ${
                !isLoggedIn ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}>
              <div className="flex  gap-4 pb-2">
                <img
                  onClick={handlePrev}
                  className={`w-5 h-5 ${
                    currentIndex === 0
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                  src={assets.prev_icon}
                  alt="Previous"
                />
                <img
                  onClick={handlePlayPause}
                  className={`w-5 h-5 ${
                    !isLoggedIn
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                  src={playStatus ? assets.pause_icon : assets.play_icon}
                  alt={playStatus ? "Pause" : "Play"}
                />
                <img
                  onClick={handleNext}
                  className={`w-5 h-5 ${
                    !isLoggedIn || currentIndex === episodeData.length - 1
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                  src={assets.next_icon}
                  alt="Next"
                />
              </div>

              <div className="flex flex-row items-center gap-3 w-[90%] max-w-[500px]">
                <p className="pb-2 ">
                  {time.currentTime.minute}:{time.currentTime.second}
                </p>
                <div
                  ref={seekBg}
                  onClick={
                    isLoggedIn ? seekEpisode : () => setShowAuthBanner(true)
                  }
                  className="w-full bg-gray-300 rounded-full cursor-pointer h-1">
                  <hr
                    ref={seekBar}
                    className="h-full w-0 bg-green-500 rounded-full"
                  />
                </div>
                <p className="pb-2">
                  {time.totalTime.minute}:{time.totalTime.second}
                </p>
              </div>
            </div>
          </>
        ) : null}
      </div>

      {showAuthBanner && (
        <AuthBanner
          message={
            <span>
              Start listening with
              <br />a Nirvify account
            </span>
          }
          onClose={() => setShowAuthBanner(false)}
        />
      )}
    </>
  );
};

export default Player;
