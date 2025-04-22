import React from "react";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";
import { PlusCircleIcon, ListBulletIcon } from "@heroicons/react/24/outline";

const Sidebar = () => {
  return (
    <div className="bg-[#242424] min-h-screen pl-[4vw]">
      <img
        src={assets.main_logo}
        className="mt-5 ml-6 w-44 hidden sm:block"
        alt=""
      />

      <div className="flex flex-col gap-5 pr-5 mt-10">
        <NavLink
          to="/admin/list-users"
          className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-24 mb-8 rounded-xl transform transition-transform duration-100 hover:scale-105 hover:font-medium text-sm font-medium">
          <ListBulletIcon className="h-5 w-5 hidden sm:block" />
          <p className="hidden sm:block">Users</p>
        </NavLink>

        <NavLink
          to="/admin/add-podcast"
          className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-24 rounded-xl transform transition-transform duration-100 hover:scale-105 hover:font-medium text-sm font-medium">
          <PlusCircleIcon className="h-5 w-5 hidden sm:block" />
          <p className="hidden sm:block">Add Podcast</p>
        </NavLink>

        <NavLink
          to="/admin/list-podcast"
          className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-24 rounded-xl transform transition-transform duration-100 hover:scale-105 hover:font-medium text-sm font-medium">
          <ListBulletIcon className="h-5 w-5 hidden sm:block" />
          <p className="hidden sm:block">List Podcast</p>
        </NavLink>

        <NavLink
          to="/admin/add-episode"
          className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-24 rounded-xl transform transition-transform duration-100 hover:scale-105 hover:font-medium text-sm font-medium">
          <PlusCircleIcon className="h-5 w-5 hidden sm:block" />
          <p className="hidden sm:block">Add Episode</p>
        </NavLink>

        <NavLink
          to="/admin/list-episode"
          className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-24 rounded-xl transform transition-transform duration-100 hover:scale-105 hover:font-medium text-sm font-medium">
          <ListBulletIcon className="h-5 w-5 hidden sm:block" />
          <p className="hidden sm:block">List Episode</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
