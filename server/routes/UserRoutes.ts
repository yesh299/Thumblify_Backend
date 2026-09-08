import express from "express";
import {
  getthumbnailbyId,
  getUsersThumbnails,
} from "../controllers/UserControllers.js";
import protect from "../middlewares/Auth.js";

const UserRouter = express.Router();

UserRouter.get("/thumbnail", protect, getUsersThumbnails);
UserRouter.get("/thumbnail/:id", protect, getthumbnailbyId);

export default UserRouter;
