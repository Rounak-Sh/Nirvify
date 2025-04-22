import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import AdminLanding from "./AdminLanding";
import AddPodcast from "../../pages/admin-pages/AddPodcast";
import AddEpisode from "../../pages/admin-pages/AddEpisode";
import ListPodcast from "../../pages/admin-pages/ListPodcast";
import ListEpisode from "../../pages/admin-pages/ListEpisode";
import ListUsers from "../../pages/admin-pages/ListUsers";

import UpdatePodcast from "../../pages/admin-pages/UpdatePodcast";
import UpdateEpisode from "../../pages/admin-pages/UpdateEpisode";

const Admin = () => {
  return (
    <div className="flex items-start min-h-screen">
      <Sidebar />
      <div className="flex-1 h-screen overflow-y-scroll bg-gray-300">
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<AdminLanding />} />

            <Route path="/list-users" element={<ListUsers />} />

            <Route path="/add-podcast" element={<AddPodcast />} />
            <Route path="/update-podcast/:id" element={<UpdatePodcast />} />

            <Route path="/add-episode" element={<AddEpisode />} />
            <Route path="/update-episode/:id" element={<UpdateEpisode />} />

            <Route path="/list-podcast" element={<ListPodcast />} />
            <Route path="/list-episode" element={<ListEpisode />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
