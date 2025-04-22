import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { assets } from "../../assets/assets";
import API_URL from "../../config/api.js";

const UpdatePodcast = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [podcast, setPodcast] = useState({
    name: "",
    podcasterName: "",
    desc: "",
  });
  const [podcastImage, setPodcastImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchPodcast = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/podcast/list-podcast`);
        const selectedPodcast = response.data.podcasts.find(
          (p) => p._id === id
        );
        if (selectedPodcast) {
          setPodcast(selectedPodcast);
          setPreviewImage(selectedPodcast.image);
        }
      } catch (error) {
        console.error("Error fetching podcast:", error);
      }
    };
    fetchPodcast();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPodcastImage(file);
      const previewURL = URL.createObjectURL(file);
      setPreviewImage(previewURL);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPodcast((prev) => ({ ...prev, [name]: value }));
    setMessage("");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!podcast.name || !podcast.podcasterName || !podcast.desc) {
      setMessage(
        "All fields are required except image if you don't want to change it."
      );
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", podcast.name);
      formData.append("podcasterName", podcast.podcasterName);
      formData.append("desc", podcast.desc);
      if (podcastImage) {
        formData.append("image", podcastImage);
      }

      await axios.put(`${API_URL}/api/podcast/update/${id}`, formData);

      setShowAlert(true);
    } catch (error) {
      setMessage("Error updating podcast. Please try again.");
      console.error("Error updating podcast:", error);
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
    setMessage("");
    navigate("/admin/list-podcast");
  };

  return (
    <div className="flex h-screen items-start text-white pl-5 sm:pt-5 sm:pl-12 bg-gradient-to-l from-[#212121] to-gray-800">
      <form
        className="flex flex-col items-start gap-7 w-full"
        onSubmit={handleFormSubmit}>
        <h2 className="text-xl font-bold text-center mb-4 w-full underline">
          Update Podcast
        </h2>

        <div className="flex items-center gap-6">
          <div className="flex flex-col gap-4">
            <p>Upload Image</p>
            <input
              type="file"
              id="image"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
            <label htmlFor="image">
              <img
                className="w-24 cursor-pointer"
                src={previewImage || assets.upload_area}
                alt="Upload"
              />
            </label>
          </div>

          {message && (
            <div className="flex mt-10 items-center">
              <ExclamationCircleIcon className="h-6 w-6 text-red-500" />
              <span className="text-red-500">{message}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2.5">
          <label htmlFor="podcastName">Podcast Name</label>
          <input
            type="text"
            name="name"
            value={podcast.name}
            onChange={handleInputChange}
            className="bg-transparent border-2 border-gray-400 focus:border-bianchigreen_dark focus:ring-0 focus:outline-none p-2.5 rounded-2xl w-[max(35vw,250px)]"
            placeholder="Type Here"
            id="podcastName"
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <label htmlFor="podcasterName">Podcaster Name</label>
          <input
            type="text"
            name="podcasterName"
            value={podcast.podcasterName}
            onChange={handleInputChange}
            className="bg-transparent border-2 border-gray-400 focus:border-bianchigreen_dark focus:ring-0 focus:outline-none p-2.5 rounded-2xl w-[max(35vw,250px)]"
            placeholder="Type Here"
            id="podcasterName"
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <label htmlFor="podcastDesc">Podcast Description</label>
          <textarea
            name="desc"
            value={podcast.desc}
            onChange={handleInputChange}
            className="bg-transparent border-2 border-gray-400 focus:border-bianchigreen_dark focus:ring-0 focus:outline-none p-2.5 rounded-2xl w-[max(35vw,250px)]"
            placeholder="Type Here"
            id="podcastDesc"></textarea>
        </div>

        <button
          type="submit"
          className="bg-black text-white py-2.5 px-16 rounded-full cursor-pointer transform transition-transform duration-100 hover:scale-105 hover:font-medium">
          UPDATE
        </button>

        {showAlert && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-green-500 w-1/5 p-6 rounded-lg text-white shadow-lg">
              <h3 className="text-lg font-bold mb-4">Success</h3>
              <p className="mb-6">Podcast updated successfully.</p>
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

export default UpdatePodcast;
