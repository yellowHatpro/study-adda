import express from "express";
import {
  createRoomController,
  getAllRoomsController, getRoomCategoriesByRoomIdController,
  getRoomController,
} from "../controllers/room_controllers";
import { requireSignIn } from "../../middlewares/auth_middleware";

const router = express.Router();
//appended to: /api/v1/room
router.post("/create", requireSignIn, createRoomController);
router.get("/", getAllRoomsController);
router.get("/:roomId", getRoomController);
router.get("/get-room-categories-by-roomId/:roomId", getRoomCategoriesByRoomIdController);

export default router;
