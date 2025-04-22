import express from "express";
import {
  createPodcast,
  getAllPodcasts,
  updatePodcast,
  deletePodcast,
} from "../controller/podcastController.js";
import upload from "../middleware/multer.js";

const router = express.Router();

// Route to create a new podcast
router.post("/add-podcast", upload.single("image"), createPodcast);

// Route to get all podcasts
router.get("/list-podcast", getAllPodcasts);

// Route to update an podcast by ID
router.put("/update/:id", upload.single("image"), updatePodcast);

// Route to delete an podcast by ID
router.delete("/:id", deletePodcast);

export default router;
