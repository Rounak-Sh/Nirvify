import mongoose from "mongoose";

const episodeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  audio: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  podcast: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Podcast",
    required: true,
  },

  episodeNo: {
    type: Number,
    required: true,
  },
});

const episodeModel = mongoose.model("Episode", episodeSchema);

export default episodeModel;
