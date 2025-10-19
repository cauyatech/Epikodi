/*
** EPITECH PROJECT, 2025
** Epikodi [WSL: Ubuntu]
** File description:
** server
*/

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.get("/", (req, res) => {
  res.send("le backend tourne bien");
});

app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Erreur interne du serveur'
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route non trouvée'
  });
});

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
