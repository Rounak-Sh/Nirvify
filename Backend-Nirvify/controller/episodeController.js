import { v2 as cloudinary } from "cloudinary";
import Episode from "../models/episodeModel.js";

// Create a new episode
const createEpisode = async (req, res) => {
  try {
    const { name, desc, podcast, episodeNo } = req.body;
    const audioFile = req.files.audio[0];
    const imageFile = req.files.image[0];

    const audioUpload = await cloudinary.uploader.upload(audioFile.path, {
      resource_type: "video",
    });
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(
      audioUpload.duration % 60
    )}`;

    const episodeData = {
      name,
      desc,
      podcast,
      episodeNo,
      duration,
      image: imageUpload.secure_url,
      audio: audioUpload.secure_url,
    };

    const episode = new Episode(episodeData);
    await episode.save();

    res.json({ success: true });
  } catch (error) {
    console.error("Error creating episode:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all episodes
const getAllEpisodes = async (req, res) => {
  try {
    const allEpisodes = await Episode.find().populate("podcast");
    res.status(200).json({ allEpisodes });
  } catch (error) {
    console.error("Error fetching episodes:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Update an episode by ID
const updateEpisode = async (req, res) => {
  const { id } = req.params;
  const { name, desc, podcast, episodeNo } = req.body;
  const imageFile = req.files.image ? req.files.image[0] : null;
  const audioFile = req.files.audio ? req.files.audio[0] : null;

  try {
    const episode = await Episode.findById(id);
    if (!episode) {
      return res.status(404).json({ success: false });
    }

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      episode.image = imageUpload.secure_url;
    }

    if (audioFile) {
      const audioUpload = await cloudinary.uploader.upload(audioFile.path, {
        resource_type: "video",
      });
      episode.audio = audioUpload.secure_url;
    }

    episode.name = name || episode.name;
    episode.desc = desc || episode.desc;
    episode.podcast = podcast || episode.podcast;
    episode.episodeNo = episodeNo || episode.episodeNo;

    await episode.save();
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error updating episode:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// Delete an episode by ID
const deleteEpisode = async (req, res) => {
  try {
    const deletedEpisode = await Episode.findByIdAndDelete(req.params.id);
    if (!deletedEpisode) {
      return res.status(404).json({ success: false });
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error deleting episode:", error);
    return res.status(500).json({ message: "Server error." });
  }
};

export { createEpisode, getAllEpisodes, updateEpisode, deleteEpisode };
