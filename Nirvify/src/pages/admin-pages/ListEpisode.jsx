import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import API_URL from "../../config/api.js";

const ListEpisode = () => {
  const [episodes, setEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [activeBanner, setActiveBanner] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/episode/list-episode`);
        setEpisodes(response.data.allEpisodes || []);
      } catch (error) {
        console.error("Error fetching episodes:", error);
      }
    };
    fetchEpisodes();
  }, []);

  const openActionBanner = (episode) => {
    setSelectedEpisode(episode);
    setActiveBanner("action");
  };

  const openDeleteBanner = (episode) => {
    setSelectedEpisode(episode);
    setActiveBanner("delete");
  };

  const closeBanner = () => {
    setSelectedEpisode(null);
    setActiveBanner(null);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/api/episode/${selectedEpisode._id}`);
      setEpisodes((prev) =>
        prev.filter((ep) => ep._id !== selectedEpisode._id)
      );
      setShowAlert(true);
      closeBanner();
    } catch (error) {
      console.error("Error deleting episode:", error);
      alert("Failed to delete the episode.");
    }
  };

  const closeAlert = () => setShowAlert(false);

  return (
    <div className="mx-auto p-8 h-screen overflow-y-scroll bg-gradient-to-l from-[#212121] to-gray-800">
      <h2 className="text-2xl text-white font-bold mb-4">Episodes List</h2>
      <table className="min-w-full text-white border-gray-300 text-center">
        <thead>
          <tr className="bg-gray-600 text-gray-200 uppercase leading-normal">
            <th className="py-3 px-4">#</th>
            <th className="py-3 px-4">Image</th>
            <th className="py-3 px-4">Episode Name</th>
            <th className="py-3 px-4">Episode No</th>
            <th className="py-3 px-4">Description</th>
            <th className="py-3 px-4">Duration</th>
            <th className="py-3 px-4">Podcast</th>
          </tr>
        </thead>
        <tbody>
          {episodes.map((episode, index) => (
            <tr
              key={episode._id}
              className="border-b border-gray-200 hover:bg-gray-400 hover:text-black transition-colors duration-200 cursor-pointer"
              onClick={() => openActionBanner(episode)}>
              <td className="py-3 px-4">{index + 1}</td>
              <td className="py-3 px-4">
                <img
                  className="w-20 object-cover mx-auto"
                  src={episode.image}
                  alt={episode.name}
                />
              </td>
              <td className="py-3 px-4">{episode.name}</td>
              <td className="py-3 px-4">{episode.episodeNo}</td>
              <td className="py-3 px-4">{episode.desc.slice(0, 20)}...</td>
              <td className="py-3 px-4">{episode.duration}</td>
              <td className="py-3 px-4">
                {episode.podcast ? episode.podcast.name : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {activeBanner === "action" && selectedEpisode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-500 p-6 rounded-lg text-black shadow-lg">
            <h3 className="text-lg font-bold mb-4">Confirm Action</h3>
            <p className="mb-6 text-center">
              What would you like to do with the episode <br />
              <span className="text-blue-800 font-semibold">
                {selectedEpisode.name.slice(0, 25)}..
              </span>
              ?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeBanner}
                className="bg-gray-300 px-4 py-2 rounded-full">
                Cancel
              </button>
              <Link to={`/admin/update-episode/${selectedEpisode._id}`}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-full">
                  Edit
                </button>
              </Link>
              <button
                onClick={() => openDeleteBanner(selectedEpisode)}
                className="bg-red-500 text-white px-4 py-2 rounded-full">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {activeBanner === "delete" && selectedEpisode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-500 p-6 rounded-lg text-black shadow-lg">
            <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
            <p className="mb-6">
              Are you sure you want to delete this episode?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeBanner}
                className="bg-gray-300 px-4 py-2 rounded-full">
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-full">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {showAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-green-500 w-1/5 p-6 rounded-lg text-white shadow-lg">
            <h3 className="text-lg font-bold mb-4">Success</h3>
            <p className="mb-6">Episode deleted successfully!</p>
            <button
              onClick={closeAlert}
              className="bg-gray-400 text-black px-4 py-2 rounded-full hover:bg-gray-200">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListEpisode;
