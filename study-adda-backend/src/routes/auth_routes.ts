import express from "express";
import {loginController, registerController} from "../controllers/auth_controllers";
import {requireSignIn} from "../../middlewares/auth_middleware";

const router = express.Router()

router.post('/register', registerController)
router.post('/login', loginController)
router.get('/user-auth', requireSignIn, (req, res)=>res.status(200).send({ok: true}))


export default router