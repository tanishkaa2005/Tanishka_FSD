const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const passengersRouter = require("./routes/passengers");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.use("/api/passengers", passengersRouter);

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

async function start() {
  if (!MONGODB_URI) {
    // Intentionally fail fast; app can't run without Mongo connection string.
    throw new Error("Missing MONGODB_URI in server/.env");
  }

  await mongoose.connect(MONGODB_URI);
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`API listening on http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});

