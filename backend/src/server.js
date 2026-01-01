import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";


dotenv.config();

const app = express();

// ✅ Proper __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/* API ROUTES */
app.get("/health", (req, res) => {
  res.status(200).json({ message: "healthy" });
});

app.get("/books", (req, res) => {
  res.status(200).json({ msg: "List of books" });
});

/* FRONTEND */
if (ENV.NODE_ENV === "production") {
  // 🔥 go OUT of backend/src → frontend/dist
  const frontendPath = path.join(__dirname, "..", "..", "frontend", "dist");

  app.use(express.static(frontendPath));

  app.use((req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

/* SERVER */
const PORT = process.env.PORT || 5000;

const startServer=async ()=>{
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
 
});
  } catch (err) {
    console.error("Failed to start server:", err);
  }
}
startServer();