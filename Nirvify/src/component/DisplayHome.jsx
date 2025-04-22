import React, { useContext } from "react";
import PodcastItem from "./PodcastItem";
import EpisodeItem from "./EpisodeItem";
import { PlayerControl } from "../playerLogic/PlayerControls";

const DisplayHome = ({ isLoggedIn }) => {
  const { episodeData, podcastData } = useContext(PlayerControl);

  return (
    <div className="bg-[#212121] pl-4 mt-3 p-0.5">
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Essential Listening</h1>
        <div className="flex overflow-auto">
          {podcastData.map((item, index) => (
            <PodcastItem
              key={index}
              name={item.name}
              desc={item.desc}
              id={item._id}
              image={item.image}
              podcasterName={item.podcasterName}
            />
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">
          Chart-Toppers: Must-Listen Episodes
        </h1>
        <div className="flex overflow-auto">
          {episodeData.map((item, index) => (
            <EpisodeItem
              key={index}
              name={item.name}
              desc={item.desc}
              episodeNo={item.episodeNo}
              id={item._id}
              image={item.image}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DisplayHome;
