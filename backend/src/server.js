import express from "express";
import dotenv from "dotenv";
import path from "path";
import { ENV } from "./lib/env.js";

dotenv.config();

const app = express();
const __dirname = path.resolve();

/* ---------- API ROUTES ---------- */

app.get("/health", (req, res) => {
  res.status(200).json({ message: "healthy" });
});

app.get("/books", (req, res) => {
  res.status(200).json({ msg: "List of books" });
});

/* ---------- SERVE FRONTEND ---------- */

if (ENV.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "frontend", "dist");

  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

/* ---------- START SERVER ---------- */

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
