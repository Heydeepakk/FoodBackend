import mongoose from "mongoose";

const catagorySchema = new mongoose.Schema({
  catagoryName: { type: String, required: true },
  image: { type: String, required: true },
});

const catagoryModel =
  mongoose.model.catagory || mongoose.model("catagory", catagorySchema);

export default catagoryModel;
