/*
** EPITECH PROJECT, 2025
** Epikodi [WSL: Ubuntu]
** File description:
** favoriteController
*/

import prisma from "../config/db.js";

export const addFavorite = async (req, res) => {
  try {
    const { mediaId } = req.body;
    const userId = req.user.id;

    const exists = await prisma.favorite.findUnique({
      where: {
        userId_mediaId: {
          userId,
          mediaId,
        },
      },
    });
    if (exists) return res.status(400).json({ message: "Already in favorites" });

    const favorite = await prisma.favorite.create({
      data: { userId, mediaId },
    });

    res.status(201).json(favorite);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const removeFavorite = async (req, res) => {
  try {
    const { mediaId } = req.params;
    const userId = req.user.id;

    await prisma.favorite.delete({
      where: {
        userId_mediaId: {
          userId,
          mediaId: Number(mediaId),
        },
      },
    });

    res.json({ message: "Removed from favorites" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserFavorites = async (req, res) => {
  try {
    const favorites = await prisma.favorite.findMany({
      where: { userId: req.user.id },
      include: { media: true },
      orderBy: { id: "desc" },
    });

    res.json(favorites.map((fav) => fav.media));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
