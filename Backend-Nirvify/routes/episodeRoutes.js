import express from "express";
import {
  createEpisode,
  getAllEpisodes,
  updateEpisode,
  deleteEpisode,
} from "../controller/episodeController.js";
import upload from "../middleware/multer.js";

const router = express.Router();

// Route to create a new episode
router.post(
  "/add-episode",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  createEpisode
);

// Route to get all episodes
router.get("/list-episode", getAllEpisodes);

// Route to update an episode by ID
router.put(
  "/update/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  updateEpisode
);

// Route to delete an episode by ID
router.delete("/:id", deleteEpisode);

export default router;
