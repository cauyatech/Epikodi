/*
** EPITECH PROJECT, 2025
** Epikodi [WSL: Ubuntu]
** File description:
** playlistController
*/

import prisma from "../config/db.js";

export const getUserPlaylists = async (req, res) => {
  try {
    const playlists = await prisma.playlist.findMany({
      where: { ownerId: req.user.id },
      include: {
        items: {
          include: { media: true },
        },
      },
    });
    res.json(playlists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createPlaylist = async (req, res) => {
  try {
    const { name } = req.body;
    const playlist = await prisma.playlist.create({
      data: { name, ownerId: req.user.id },
    });
    res.status(201).json(playlist);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const addToPlaylist = async (req, res) => {
  try {
    const { playlistId, mediaId } = req.body;
    await prisma.playlistItem.create({
      data: { playlistId, mediaId },
    });
    res.json({ message: "Media added to playlist" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
