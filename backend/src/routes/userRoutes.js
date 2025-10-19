/*
** EPITECH PROJECT, 2025
** Epikodi [WSL: Ubuntu]
** File description:
** Authentication routes
*/

import express from "express";
import { register, login, getProfile } from "../controllers/userController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get("/me", verifyToken, getProfile);

export default router;
