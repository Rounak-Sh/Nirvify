import React, { useState, useEffect } from "react";
import axios from "axios";
import { assets } from "../../assets/assets";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import API_URL from "../../config/api.js";

const AddEpisode = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [episodeName, setEpisodeName] = useState("");
  const [episodeDesc, setEpisodeDesc] = useState("");
  const [episodeImage, setEpisodeImage] = useState(null);
  const [audiofile, setAudiofile] = useState(null);
  const [selectedPodcast, setSelectedPodcast] = useState("");
  const [episodeNo, setEpisodeNo] = useState("");
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!episodeImage || !audiofile) {
      setMessage("Both image and audio file are required.");
      return;
    }

    if (!episodeName || !episodeNo || !episodeDesc || !selectedPodcast) {
      setMessage("All fields are required.");
      return;
    }

    if (episodeNo < 1) {
      setMessage("Episode number must be greater than or equal to 1.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", episodeName);
      formData.append("desc", episodeDesc);
      formData.append("podcast", selectedPodcast);
      formData.append("image", episodeImage);
      formData.append("audio", audiofile);
      formData.append("episodeNo", episodeNo);

      const response = await axios.post(
        `${API_URL}/api/episode/add-episode`,
        formData
      );

      if (response.data.success) {
        setShowAlert(true);
        setEpisodeName("");
        setEpisodeDesc("");
        setEpisodeImage(null);
        setAudiofile(null);
        setSelectedPodcast("");
        setEpisodeNo("");
        setMessage("");
      } else {
        setMessage("Error: " + (response.data.message || "An error occurred."));
      }
    } catch (error) {
      console.error(
        "Error adding episode:",
        error.response?.data?.message || error.message
      );
      setMessage(
        "Error: " +
          (error.response?.data?.message || "An unexpected error occurred.")
      );
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
    setMessage("");
  };

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/podcast/list-podcast`);
        setPodcasts(response.data.podcasts);
      } catch (error) {
        console.error("Error fetching podcasts:", error);
      }
    };

    fetchPodcasts();
  }, []);

  return (
    <div className="flex h-screen overflow-y-scroll items-start text-white pt-8 pl-5 sm:pt-5 sm:pl-12 bg-gradient-to-l from-[#212121] to-gray-800">
      <form
        className="flex flex-col items-start pb-10 gap-7 w-full"
        onSubmit={handleFormSubmit}>
        <h2 className="text-xl font-bold text-center mb-4 w-full underline">
          Episode Details
        </h2>

        <div className="flex gap-8">
          <div className="flex flex-col gap-4">
            <p>Upload Image</p>
            <input
              type="file"
              id="image"
              onChange={(e) => setEpisodeImage(e.target.files[0])}
              accept="image/*"
              hidden
            />
            <label htmlFor="image">
              <img
                src={
                  episodeImage
                    ? URL.createObjectURL(episodeImage)
                    : assets.upload_area
                }
                className="w-24 cursor-pointer"
                alt="Upload Image"
              />
            </label>
          </div>

          <div className="flex flex-col gap-4">
            <p>Upload Audio</p>
            <input
              type="file"
              id="audio"
              onChange={(e) => setAudiofile(e.target.files[0])}
              accept="audio/*"
              hidden
            />
            <label htmlFor="audio">
              <img
                src={audiofile ? assets.uploaded_audio : assets.upload_audio}
                className="w-24 cursor-pointer"
                alt="Upload Audio"
              />
            </label>
          </div>
          {message && (
            <div className="mt-10 pl-6 flex items-center">
              <ExclamationCircleIcon className="h-6 w-6 mr-0.5 text-red-500" />
              <span className="text-red-500">{message}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2.5">
          <label htmlFor="episodeName">Episode Name</label>
          <input
            type="text"
            value={episodeName}
            onChange={(e) => {
              setEpisodeName(e.target.value);
              setMessage("");
            }}
            className="bg-transparent border-2 border-gray-400 focus:border-bianchigreen_dark focus:ring-0 focus:outline-none p-2.5 rounded-2xl w-[max(35vw,250px)]"
            placeholder="Type Here"
            id="episodeName"
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <label htmlFor="episodeNo">Episode Number</label>
          <input
            type="number"
            value={episodeNo}
            onChange={(e) => {
              setEpisodeNo(e.target.value);
              setMessage("");
            }}
            className="bg-transparent border-2 border-gray-400 focus:border-bianchigreen_dark focus:ring-0 focus:outline-none p-2.5 rounded-2xl w-[max(35vw,250px)]"
            placeholder="Type Here"
            id="episodeNo"
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <label htmlFor="episodeDesc">Episode Description</label>
          <textarea
            value={episodeDesc}
            onChange={(e) => {
              setEpisodeDesc(e.target.value);
              setMessage("");
            }}
            className="bg-transparent border-2 border-gray-400 focus:border-bianchigreen_dark focus:ring-0 focus:outline-none p-2.5 rounded-2xl w-[max(35vw,250px)]"
            placeholder="Type Here"
            id="episodeDesc"></textarea>
        </div>

        <div className="relative flex flex-col gap-2.5">
          <p>Select Podcast</p>
          <select
            className="bg-gray-600 border-2 w-44 border-gray-400 focus:border-bianchigreen_dark focus:ring-0 focus:outline-none rounded-2xl px-6 py-2"
            name="podcast"
            value={selectedPodcast}
            onChange={(e) => {
              setSelectedPodcast(e.target.value);
              setMessage("");
            }}>
            <option value="">Select Podcast</option>
            {podcasts.map((podcast) => (
              <option key={podcast._id} value={podcast._id}>
                {podcast.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="absolute ml-48 mt-9 text-base bg-black text-white py-2.5 px-16 rounded-full cursor-pointer transform transition-transform duration-100 hover:scale-105 hover:font-medium">
            ADD
          </button>
        </div>

        {showAlert && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-green-500 w-1/5 p-6 rounded-lg text-white shadow-lg">
              <h3 className="text-lg font-bold mb-4">Success</h3>
              <p className="mb-6">Episode added successfully.</p>
              <button
                onClick={closeAlert}
                className="bg-gray-400 text-black px-4 py-2 rounded-full hover:bg-gray-200">
                Close
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddEpisode;
