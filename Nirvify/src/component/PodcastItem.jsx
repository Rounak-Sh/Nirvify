import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const PodcastItem = ({ image, name, podcasterName, id }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/podcast/${id}`)}
      className="relative group min-w-[230px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]">
      <img className="rounded" src={image} alt="" />
      <div className="absolute bottom-[100px] right-3.5 opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-0 transition-all duration-300">
        <img className="w-[70px]" src={assets.play_button} alt="" />
      </div>
      <p className="font-bold text-lg mt-2 mb-1">{name}</p>
      <p className="text-slate-200 text-sm">{podcasterName}</p>
    </div>
  );
};

export default PodcastItem;
