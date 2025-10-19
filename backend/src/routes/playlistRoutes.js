/*
** EPITECH PROJECT, 2025
** Epikodi [WSL: Ubuntu]
** File description:
** playlistRoutes
*/

import express from "express";
import { getUserPlaylists, createPlaylist, addToPlaylist } from "../controllers/playlistController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getUserPlaylists);
router.post("/", verifyToken, createPlaylist);
router.post("/add", verifyToken, addToPlaylist);

export default router;
