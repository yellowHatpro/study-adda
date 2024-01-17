import express from "express";
import {registerController} from "../controllers/auth_controllers";

const router = express.Router()

router.post('/register', registerController)

export default router