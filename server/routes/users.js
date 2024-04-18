import express from "express";
import { createUser } from "../controllers/userController.js";
import { validateUser } from "../validators/userValidator.js";

const router = express.Router();

router.post("/users", validateUser, createUser);

export default router;
