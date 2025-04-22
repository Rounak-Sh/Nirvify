import { v2 as cloudinary } from "cloudinary";
import Podcast from "../models/podcastModel.js";
import Episode from "../models/episodeModel.js";

// Create a new podcast
const createPodcast = async (req, res) => {
  try {
    const { name, desc, podcasterName } = req.body;
    const imageFile = req.file;

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    const podcastData = {
      name,
      desc,
      podcasterName,
      image: imageUpload.secure_url,
    };

    const podcast = new Podcast(podcastData);
    await podcast.save();

    return res.status(201).json({
      success: true,
    });
  } catch (error) {
    console.error("Error creating podcast:", error);
    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// Fetch all podcasts
const getAllPodcasts = async (req, res) => {
  try {
    const allPodcasts = await Podcast.find({});
    return res.json({ success: true, podcasts: allPodcasts });
  } catch (error) {
    console.error("Error fetching podcasts:", error);
    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// Delete a podcast by ID with cascading deletion of episodes
const deletePodcast = async (req, res) => {
  const { id } = req.params;

  try {
    const podcast = await Podcast.findById(id);
    if (!podcast) {
      return res.status(404).json({
        success: false,
      });
    }

    await Episode.deleteMany({ podcast: id });

    await Podcast.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error("Error deleting podcast:", error);
    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// Update an existing podcast
const updatePodcast = async (req, res) => {
  const { id } = req.params;
  const { name, desc, podcasterName } = req.body;
  const imageFile = req.file;

  try {
    const podcast = await Podcast.findById(id);
    if (!podcast) {
      return res.status(404).json({ success: false });
    }

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      podcast.image = imageUpload.secure_url;
    }

    podcast.name = name || podcast.name;
    podcast.desc = desc || podcast.desc;
    podcast.podcasterName = podcasterName || podcast.podcasterName;

    await podcast.save();

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error("Error updating podcast:", error);
    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

export { createPodcast, getAllPodcasts, deletePodcast, updatePodcast };
