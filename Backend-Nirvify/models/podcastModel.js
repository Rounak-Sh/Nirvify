import mongoose from "mongoose";

const podcastSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  podcasterName: {
    type: String,
    required: true,
  },
});

const podcastModel = mongoose.model("Podcast", podcastSchema);

export default podcastModel;
