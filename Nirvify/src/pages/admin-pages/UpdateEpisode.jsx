import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { assets } from "../../assets/assets";
import API_URL from "../../config/api.js";

const UpdateEpisode = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [podcasts, setPodcasts] = useState([]);
  const [episode, setEpisode] = useState({
    name: "",
    desc: "",
    podcast: "",
    episodeNo: "",
    audio: "",
  });

  const [audioFile, setAudioFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [audioPreview, setAudioPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/podcast/list-podcast`);
        setPodcasts(response.data.podcasts);
      } catch (error) {
        console.error("Error fetching podcasts:", error);
      }
    };

    const fetchEpisode = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/episode/list-episode`);
        const selectedEpisode = response.data.allEpisodes.find(
          (e) => e._id === id
        );
        if (selectedEpisode) {
          setEpisode({
            ...selectedEpisode,
            podcast: selectedEpisode.podcast?._id || "",
          });
          setPreviewImage(selectedEpisode.image);
          setAudioPreview(selectedEpisode.audio);
        }
      } catch (error) {
        console.error("Error fetching episode:", error);
      }
    };

    fetchPodcasts();
    fetchEpisode();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEpisode((prev) => ({ ...prev, [name]: value }));
    setMessage("");
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    } else if (name === "audio") {
      const file = files[0];
      setAudioFile(file);
      setAudioPreview(URL.createObjectURL(file));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (
      !episode.name.trim() ||
      !episode.desc.trim() ||
      !episode.podcast.trim() ||
      !episode.episodeNo
    ) {
      setMessage("All fields are required.");
      return;
    }

    if (episode.episodeNo < 1) {
      setMessage("Episode number must be greater than or equal to 1.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", episode.name);
      formData.append("desc", episode.desc);
      formData.append("podcast", episode.podcast);
      formData.append("episodeNo", episode.episodeNo);
      if (imageFile) formData.append("image", imageFile);
      if (audioFile) formData.append("audio", audioFile);

      await axios.put(`${API_URL}/api/episode/update/${id}`, formData);

      setShowAlert(true);
    } catch (error) {
      console.error("Error updating episode:", error);
      setMessage("Failed to update the episode.");
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
    setMessage("");
    navigate("/admin/list-episode");
  };

  return (
    <div className="flex h-screen overflow-y-scroll items-start text-white pt-8 pl-5 sm:pt-5 sm:pl-12 bg-gradient-to-l from-[#212121] to-gray-800">
      <form
        className="flex flex-col items-start pb-10 gap-7 w-full"
        onSubmit={handleFormSubmit}>
        <h2 className="text-xl font-bold text-center mb-4 w-full underline">
          Update Episode
        </h2>

        <div className="flex gap-8">
          <div className="flex flex-col gap-4">
            <p>Upload Image</p>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              hidden
              id="image-upload"
            />
            <label htmlFor="image-upload">
              <img
                src={previewImage || assets.upload_area}
                alt="Upload"
                className="w-24 cursor-pointer"
              />
            </label>
          </div>

          <div className="flex flex-col gap-4">
            <p>Upload Audio</p>
            <input
              type="file"
              name="audio"
              accept="audio/*"
              onChange={handleFileChange}
              hidden
              id="audio-upload"
            />
            <label htmlFor="audio-upload">
              <img
                src={
                  audioFile
                    ? assets.uploaded_audio
                    : audioPreview
                    ? assets.uploaded_audio
                    : assets.upload_audio
                }
                alt="Upload Audio"
                className="w-24 cursor-pointer"
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
            name="name"
            value={episode.name}
            onChange={handleInputChange}
            className="bg-transparent border-2 border-gray-400 focus:border-bianchigreen_dark focus:ring-0 focus:outline-none p-2.5 rounded-2xl w-[max(35vw,250px)]"
            placeholder="Type Here"
            id="episodeName"
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <label htmlFor="episodeNo">Episode Number</label>
          <input
            type="number"
            name="episodeNo"
            value={episode.episodeNo}
            onChange={handleInputChange}
            className="bg-transparent border-2 border-gray-400 focus:border-bianchigreen_dark focus:ring-0 focus:outline-none p-2.5 rounded-2xl w-[max(35vw,250px)]"
            placeholder="Type Here"
            id="episodeNo"
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <label htmlFor="episodeDesc">Episode Description</label>
          <textarea
            name="desc"
            value={episode.desc}
            onChange={handleInputChange}
            className="bg-transparent border-2 border-gray-400 focus:border-bianchigreen_dark focus:ring-0 focus:outline-none p-2.5 rounded-2xl w-[max(35vw,250px)]"
            placeholder="Type Here"
            id="episodeDesc"></textarea>
        </div>

        <div className="relative flex flex-col gap-2.5">
          <p>Select Podcast</p>
          <select
            className="bg-gray-600 w-44 border-2 border-gray-400 focus:border-bianchigreen_dark focus:ring-0 focus:outline-none rounded-2xl px-6 py-2"
            name="podcast"
            value={episode.podcast}
            onChange={handleInputChange}>
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
            UPDATE
          </button>
        </div>

        {showAlert && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-green-500 w-1/5 p-6 rounded-lg text-white shadow-lg">
              <h3 className="text-lg font-bold mb-4">Success</h3>
              <p className="mb-6">Episode updated successfully.</p>
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

export default UpdateEpisode;
