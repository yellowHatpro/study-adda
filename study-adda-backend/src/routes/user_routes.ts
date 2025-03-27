import express from "express";
import {getUserJoinedRoomsController, joinUserRoomController, userController} from "../controllers/user_controllers";
import {requireSignIn} from "../../middlewares/auth_middleware";

const router = express.Router();
//appended to: /api/v1/user

router.get("/", requireSignIn,  userController)
router.get("/rooms-joined", requireSignIn, getUserJoinedRoomsController)
router.post("/join-room", requireSignIn, joinUserRoomController)
export default router