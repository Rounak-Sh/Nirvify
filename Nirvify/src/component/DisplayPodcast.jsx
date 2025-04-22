import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PlayerControl } from "../playerLogic/PlayerControls";
import AuthBanner from "./AuthBanner";
import { assets } from "../assets/assets";

const DisplayPodcast = ({ isLoggedIn }) => {
  const { id } = useParams();
  const [podcastsData, setPodcastsData] = useState(null);
  const { playWithId, podcastData, episodeData } = useContext(PlayerControl);
  const [showAuthBanner, setShowAuthBanner] = useState(false);
  const filteredEpisodes = episodeData.filter(
    (episode) => episode.podcast && episode.podcast._id === id
  );

  const handleEpisodeClick = (episodeId) => {
    if (!episodeId) return;
    if (isLoggedIn) {
      playWithId(episodeId).catch((error) => {
        console.error("Failed to play episode:", error);
      });
    } else {
      setShowAuthBanner(true);
    }
  };

  useEffect(() => {
    const selectedPodcast = podcastData.find((item) => item._id === id);
    if (selectedPodcast) {
      setPodcastsData(selectedPodcast);
    }
  }, [podcastData, id]);

  return podcastsData ? (
    <>
      <div className="bg-[#212121] pl-5 mt-3 p-0.5 pb-5">
        <div className="mt-5 flex gap-4 flex-col md:flex-row md:items-end">
          <img className="w-48 rounded" src={podcastsData.image} alt="" />
          <div className="flex flex-col font-circular">
            <p className="font-semibold pl-1">Podcast</p>
            <p className="text-5xl font-bold md:text-7xl">
              {podcastsData.name}
            </p>
            <p className="pl-1 text-lg font-bold pt-1">
              {podcastsData.podcasterName}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#ffffff26] pl-5 p-0.5 pb-5">
        <div className="mt-5 flex gap-4 flex-col md:items-start">
          <h1 className="font-medium">About</h1>
          <p className="text-zinc-400">{podcastsData.desc}</p>
        </div>

        <div className="pt-8 pb-4 pr-5">
          <hr />
        </div>

        {filteredEpisodes.length > 0 ? (
          filteredEpisodes.map((episode) => (
            <div
              key={episode._id}
              onClick={() => handleEpisodeClick(episode._id)}
              className="cursor-pointer flex flex-col items-center">
              <div className="flex gap-4 flex-col md:flex-row w-[80%] p-5 hover:bg-[#212121] hover:rounded-md">
                <img className="w-32 rounded" src={episode.image} alt="" />
                <div className="text-xl mb-2">
                  Episode No: {episode.episodeNo} - {episode.name}
                  <img
                    className="inline-flex mb-2 size-14 ml-2 cursor-pointer transform transition-transform duration-100 hover:scale-105"
                    src={assets.play_button}
                    alt="Play"
                  />
                  <p className="text-sm">{episode.desc}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No episodes available for this podcast.</p>
        )}
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
  ) : null;
};

export default DisplayPodcast;
