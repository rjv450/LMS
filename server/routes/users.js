import express from "express";
import {
  createUser,
  userLogin,
  refreshToken,
} from "../controllers/userController.js";
import {
  validateUser,
  validateLogin,
  validateRefreshToken,
} from "../validators/userValidator.js";

const router = express.Router();

router.post("/users", validateUser, createUser);
router.post("/login", validateLogin, userLogin);
router.post("/refresh-token", validateRefreshToken, refreshToken);
export default router;
