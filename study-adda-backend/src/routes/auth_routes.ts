import express from "express";
import {githubController, loginController, registerController} from "../controllers/auth_controllers";
import {requireSignIn} from "../../middlewares/auth_middleware";

const router = express.Router()
// appened to: /api/v1/auth
router.post('/register', registerController)
router.post('/login', loginController)
router.get('/github', githubController)
router.get('/user-auth', requireSignIn, (req, res)=>res.status(200).send({ok: true}))

export default router