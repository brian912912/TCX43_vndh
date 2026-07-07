require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");

const app = express();

connectDB();

const localOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }

    const allowedOrigins = process.env.CLIENT_URL
      ? process.env.CLIENT_URL.split(",").map((item) => item.trim())
      : [];

    const origins = [...new Set([...allowedOrigins, ...localOrigins])];

    if (origins.includes(origin)) {
      return callback(null, true);
    }

    return callback(
      new Error(`CORS policy does not allow access from origin ${origin}`),
    );
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "tcx43-backend" });
});

app.use("/api/auth", authRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5003;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
