import express from "express";
import {
  createUser,
  userLogin,
  refreshToken,
  getUsersList,
  // deleteUser
} from "../controllers/userController.js";
import {
  validateUser,
  validateLogin,
  validateRefreshToken,
  validateUserDelete,
} from "../validators/userValidator.js";

const router = express.Router();

router.post("/", validateUser, createUser);
router.get("/", getUsersList);
// router.delete("/", validateUserDelete, deleteUser);
router.post("/login", validateLogin, userLogin);
router.post("/refresh-token", validateRefreshToken, refreshToken);
export default router;
