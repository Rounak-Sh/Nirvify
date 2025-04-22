import React, { useState } from "react";
import axios from "axios";
import { assets } from "../../assets/assets";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import API_URL from "../../config/api.js";

const AddPodcast = () => {
  const [podcastName, setPodcastName] = useState("");
  const [podcasterName, setPodcasterName] = useState("");
  const [podcastDesc, setPodcastDesc] = useState("");
  const [podcastImage, setPodcastImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPodcastImage(file);
      const previewURL = URL.createObjectURL(file);
      setPreviewImage(previewURL);
      setMessage("");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!podcastName || !podcasterName || !podcastDesc || !podcastImage) {
      setMessage("All fields are required.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", podcastName);
      formData.append("podcasterName", podcasterName);
      formData.append("desc", podcastDesc);
      formData.append("image", podcastImage);

      await axios.post(`${API_URL}/api/podcast/add-podcast`, formData);

      setShowAlert(true);

      setPodcastName("");
      setPodcasterName("");
      setPodcastDesc("");
      setPodcastImage(null);
      setPreviewImage(null);
    } catch (error) {
      setMessage("Error occurred while adding podcast.");
      console.error("Error adding podcast:", error);
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
    setMessage("");
  };

  return (
    <div className="flex h-screen items-start text-white pl-5 sm:pt-5 sm:pl-12 bg-gradient-to-l from-[#212121] to-gray-800">
      <form
        className="flex flex-col items-start gap-7 w-full"
        onSubmit={handleFormSubmit}>
        <h2 className="text-xl font-bold text-center mb-4 w-full underline">
          Podcast Details
        </h2>

        <div className="flex flex-initial">
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
                alt="Upload area"
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
          <p>Podcast Name</p>
          <input
            className="bg-transparent border-2 border-gray-400 focus:border-bianchigreen_dark focus:ring-0 focus:outline-none p-2.5 rounded-2xl w-[max(35vw,250px)]"
            placeholder="Type Here"
            value={podcastName}
            onChange={(e) => {
              setPodcastName(e.target.value);
              setMessage("");
            }}
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <p>Podcaster Name</p>
          <input
            className="bg-transparent border-2 border-gray-400 focus:border-bianchigreen_dark focus:ring-0 focus:outline-none p-2.5 rounded-2xl w-[max(35vw,250px)]"
            placeholder="Podcaster Name"
            value={podcasterName}
            onChange={(e) => {
              setPodcasterName(e.target.value);
              setMessage("");
            }}
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <p>Podcast Description</p>
          <textarea
            className="bg-transparent border-2 border-gray-400 focus:border-bianchigreen_dark focus:ring-0 focus:outline-none p-2.5 rounded-2xl w-[max(35vw,250px)]"
            placeholder="Type Here"
            value={podcastDesc}
            onChange={(e) => {
              setPodcastDesc(e.target.value);
              setMessage("");
            }}
          />
        </div>

        <button
          className="text-base bg-black text-white py-2.5 px-14 rounded-full cursor-pointer transform transition-transform duration-100 hover:scale-105 hover:font-medium"
          type="submit">
          ADD
        </button>
      </form>

      {showAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-green-500 w-1/5 p-6 rounded-lg text-white shadow-lg">
            <h3 className="text-lg font-bold mb-4">Success</h3>
            <p className="mb-6">Podcast added successfully.</p>
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

export default AddPodcast;
