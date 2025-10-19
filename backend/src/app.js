import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes.js";
import mediaRoutes from "./routes/mediaRoutes.js";
import playlistRoutes from "./routes/playlistRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/playlists", playlistRoutes);
app.use("/api/favorites", favoriteRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
