import express from "express";
import {
  githubController,
  loginController,
  registerController, signInController,
} from "../controllers/auth_controllers";
import { requireSignIn } from "../../middlewares/auth_middleware";

const router = express.Router();
// appended to: /api/v1/auth
router.post("/register", registerController);
router.get("/sign-in", signInController)
router.post("/login", loginController);
router.post("/refresh-token");
router.get("/github", githubController);
router.get("/user-auth", requireSignIn, (req, res) =>
  res.status(200).send({ ok: true }),
);

export default router;
