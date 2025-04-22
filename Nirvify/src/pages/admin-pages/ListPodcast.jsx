import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ListPodcast = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [activeBanner, setActiveBanner] = useState(null);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/podcast/list-podcast"
        );
        setPodcasts(response.data.podcasts);
      } catch (error) {
        console.error("Error fetching podcasts:", error);
      }
    };
    fetchPodcasts();
  }, []);

  const openBanner = (podcast) => {
    setSelectedPodcast(podcast);
    setActiveBanner("action");
  };

  const closeBanner = () => {
    setSelectedPodcast(null);
    setActiveBanner(null);
  };

  const openDeleteBanner = () => {
    setActiveBanner("delete");
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/api/podcast/${selectedPodcast._id}`
      );
      setPodcasts((prev) =>
        prev.filter((podcast) => podcast._id !== selectedPodcast._id)
      );
      closeBanner();
      setActiveBanner("alert");
    } catch (error) {
      console.error("Error deleting podcast:", error);
      alert("Failed to delete the podcast.");
    }
  };

  const closeAlert = () => {
    setActiveBanner(null);
  };

  return (
    <div className="mx-auto p-8 h-screen overflow-y-scroll bg-gradient-to-l from-[#212121] to-gray-800">
      <h2 className="text-2xl text-white font-bold mb-4">Podcasts List</h2>

      <table className="min-w-full text-white border-gray-300 text-center">
        <thead>
          <tr className="bg-gray-600 text-gray-200 uppercase leading-normal">
            <th className="py-3 px-6">#</th>
            <th className="py-3 px-6">Image</th>
            <th className="py-3 px-6">Podcast Name</th>
            <th className="py-3 px-6">Podcaster Name</th>
            <th className="py-3 px-6">Description</th>
          </tr>
        </thead>
        <tbody>
          {podcasts.map((podcast, index) => (
            <tr
              key={podcast._id}
              onClick={() => openBanner(podcast)}
              className="border-b border-gray-200 hover:bg-gray-400 hover:text-black transition-colors duration-200 cursor-pointer">
              <td className="py-3 px-6 align-middle">{index + 1}</td>
              <td className="py-3 px-6">
                <img
                  className="w-20 object-cover mx-auto"
                  src={podcast.image}
                  alt=""
                />
              </td>
              <td className="py-3 px-6 align-middle">{podcast.name}</td>
              <td className="py-3 px-6 align-middle">
                {podcast.podcasterName}
              </td>
              <td className="py-3 px-6 align-middle">
                {podcast.desc.slice(0, 50)}...
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {activeBanner === "action" && selectedPodcast && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-500 p-6 rounded-lg text-black shadow-lg">
            <h3 className="text-lg font-bold mb-4">Confirm Action</h3>
            <p className="mb-6 text-center">
              What would you like to do with the podcast <br />
              <span className="text-blue-800">{selectedPodcast.name}</span>?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeBanner}
                className="bg-gray-300 px-4 py-2 rounded-full hover:bg-gray-400">
                Cancel
              </button>
              <Link to={`/admin/update-podcast/${selectedPodcast._id}`}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">
                  Edit
                </button>
              </Link>
              <button
                onClick={openDeleteBanner}
                className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {activeBanner === "delete" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-500 p-6 rounded-lg text-black shadow-lg">
            <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
            <p className="mb-6 text-center">
              Are you sure you want to delete this <br />
              podcast with
              <span className="text-red-700"> all its episodes?</span>
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeBanner}
                className="bg-gray-300 px-4 py-2 rounded-full hover:bg-gray-400">
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {activeBanner === "alert" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-green-500 w-1/5 p-6 rounded-lg text-white shadow-lg">
            <h3 className="text-lg font-bold mb-4">Success</h3>
            <p className="mb-6">Podcast deleted successfully.</p>
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

export default ListPodcast;
