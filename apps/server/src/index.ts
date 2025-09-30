import express from "express";
import pino from "pino";
import pinoHttp from "pino-http";
import { env } from "./env.js";
import { security } from "./middleware/security.js";
import { notFound, onError } from "./middleware/error.js";
import skills from "./routes/skills.js";

const app = express();

app.set("trust proxy", 1);
app.use(express.json({ limit: "256kb" }));
app.use(pinoHttp({ logger: pino({ level: env.LOG_LEVEL }) }));

app.use(...security);

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, version: "1.0.0", env: env.NODE_ENV });
});

app.use("/api/skills", skills);

app.use(notFound);
app.use(onError);

app.listen(env.PORT, () => {
  console.log(`API on http://localhost:${env.PORT}`);
});
