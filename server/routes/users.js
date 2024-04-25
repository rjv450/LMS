import express from "express";
import {
  createUser,
  userLogin,
  refreshToken,
  getUsersList,
  deleteUser,
  updateUser,
  getUserById
} from "../controllers/userController.js";
import {
  validateUser,
  validateLogin,
  validateRefreshToken,
  validateUserDelete,
  validateUpdateUser,
} from "../validators/userValidator.js";

const router = express.Router();

router.post("/", validateUser, createUser);
router.get("/", getUsersList);
router.get("/:id",getUserById)
router.delete("/:id", validateUserDelete, deleteUser);
router.put("/:id", validateUpdateUser, updateUser);
router.post("/login", validateLogin, userLogin);
router.post("/refresh-token", validateRefreshToken, refreshToken);
export default router;
