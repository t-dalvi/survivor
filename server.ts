import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("survivor.db");

// Initialize DB
db.exec(`
  CREATE TABLE IF NOT EXISTS watch_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    seasonId INTEGER,
    episodeNumber INTEGER,
    rating INTEGER,
    notes TEXT,
    watchedAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/logs", (req, res) => {
    const logs = db.prepare("SELECT * FROM watch_logs ORDER BY watchedAt DESC").all();
    res.json(logs);
  });

  app.post("/api/logs", (req, res) => {
    const { seasonId, episodeNumber, rating, notes } = req.body;
    const info = db.prepare(
      "INSERT INTO watch_logs (seasonId, episodeNumber, rating, notes) VALUES (?, ?, ?, ?)"
    ).run(seasonId, episodeNumber, rating, notes);
    res.json({ id: info.lastInsertRowid });
  });

  app.delete("/api/logs/:id", (req, res) => {
    db.prepare("DELETE FROM watch_logs WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
