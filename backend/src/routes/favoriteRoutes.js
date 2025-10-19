/*
** EPITECH PROJECT, 2025
** Epikodi [WSL: Ubuntu]
** File description:
** favoriteRoutes
*/

import express from "express";
import {
  addFavorite,
  removeFavorite,
  getUserFavorites,
} from "../controllers/favoriteController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getUserFavorites);
router.post("/", verifyToken, addFavorite);
router.delete("/:mediaId", verifyToken, removeFavorite);

export default router;
