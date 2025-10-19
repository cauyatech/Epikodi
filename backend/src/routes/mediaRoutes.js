/*
** EPITECH PROJECT, 2025
** Epikodi [WSL: Ubuntu]
** File description:
** mediaRoutes
*/

import express from "express";
import { getAllMedia, createMedia, deleteMedia } from "../controllers/mediaController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getAllMedia);
router.post("/", verifyToken, createMedia);
router.delete("/:id", verifyToken, deleteMedia);

export default router;
