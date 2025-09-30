import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import rateLimit from "express-rate-limit";
import { env } from "../env.js";

export const security = [
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
  }),
  cors({
    origin: [env.FRONTEND_ORIGIN],
    credentials: true
  }),
  compression(),
  rateLimit({ windowMs: 15 * 60 * 1000, max: 600 })
];
