import express from "express";
import {getUserJoinedRoomsController, userController} from "../controllers/user_controllers";
import {requireSignIn} from "../../middlewares/auth_middleware";

const router = express.Router();
//appended to: /api/v1/user

router.get("/", requireSignIn,  userController)
router.get("/rooms-joined", requireSignIn, getUserJoinedRoomsController)

export default router