/*
** EPITECH PROJECT, 2025
** Epikodi [WSL: Ubuntu]
** File description:
** mediaController
*/

import prisma from "../config/db.js";

export const getAllMedia = async (req, res) => {
  try {
    const { q, type, year } = req.query;
    const where = {};

    if (q) {
      where.title = { contains: q, mode: "insensitive" };
    }
    if (type) {
      where.type = type;
    }
    if (year) {
      where.year = Number(year);
    }
    const media = await prisma.media.findMany({
      where,
      include: { owner: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(media);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createMedia = async (req, res) => {
  try {
    const { title, type, year, duration, filePath, description } = req.body;
    const media = await prisma.media.create({
      data: {
        title,
        type,
        year,
        duration,
        filePath,
        description,
        ownerId: req.user.id,
      },
    });
    res.status(201).json(media);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteMedia = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.media.delete({ where: { id: Number(id) } });
    res.json({ message: "Media deleted." });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
