import express from "express";
import {
  createRoomController,
  getAllRoomsController,
  getRoomController,
} from "../controllers/room_controllers";
import { requireSignIn } from "../../middlewares/auth_middleware";

const router = express.Router();
//appended to: /api/v1/room
router.post("/create", requireSignIn, createRoomController);
router.get("/", getAllRoomsController);
router.get("/:roomID", getRoomController);

export default router;
