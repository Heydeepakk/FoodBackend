import express from "express";
import {
  addCatagory,
  listCatagory,
  removeCatagory,
} from "../controllers/catagoryController.js";
import multer from "multer";

const catagoryRouter = express.Router();

// Image Storage Engine

const storage = multer.diskStorage({

  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });
catagoryRouter.post("/addCatagory", upload.single("image"), addCatagory);
catagoryRouter.get("/listCatagory", listCatagory);
catagoryRouter.post("/removeCatagory", removeCatagory);

export default catagoryRouter;
