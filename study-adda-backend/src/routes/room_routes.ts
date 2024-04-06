import express from "express";
import {
  createRoomCategoryController,
  createRoomController, getAllRoomCategoriesController,
  getAllRoomsController, getRoomCategoriesByRoomIdController,
  getRoomController,
} from "../controllers/room_controllers";

const router = express.Router();
//appended to: /api/v1/room
router.post("/create", createRoomController);
router.post("/create-room-category", createRoomCategoryController)
router.get("/", getAllRoomsController);
router.get("/get-all-room-categories", getAllRoomCategoriesController);
router.get("/:roomId", getRoomController);
router.get("/get-room-categories-by-roomId/:roomId", getRoomCategoriesByRoomIdController);

export default router;
