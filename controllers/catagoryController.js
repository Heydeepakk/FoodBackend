import fs from 'fs';
import catagoryModel from '../models/catagoryModel.js';
import cloudinary from '../config/cloudinary.js';

const addCatagory = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);

    const catagory = new catagoryModel({
      catagoryName: req.body.catagoryName,
      image: result.secure_url,
    });

    await catagory.save();
    res.json({ success: true, message: 'Catagory Added' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error' });
  }
};

const listCatagory = async (req, res) => {
  try {
    const foods = await catagoryModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error' });
  }
};

const removeCatagory = async (req, res) => {
  try {
    const catagory = await catagoryModel.findById(req.body.id);

    // Extract public_id from image URL
    const publicId = catagory.image.split('/').pop().split('.')[0];

    // Remove image from Cloudinary
    await cloudinary.uploader.destroy(publicId);

    await catagoryModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: 'Catagory Removed' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error' });
  }
};

export { addCatagory, listCatagory, removeCatagory };
