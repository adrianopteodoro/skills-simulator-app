import { Router } from "express";
import { z } from "zod";

const router = Router();

router.get("/", (_req, res) => {
  // exemplo de listagem (placeholder)
  res.json([{ id: 1, name: "Vue", level: 4 }]);
});

router.post("/", (req, res, next) => {
  try {
    const schema = z.object({
      name: z.string().min(1),
      level: z.number().int().min(0).max(5)
    });
    const skill = schema.parse(req.body);
    // salvar...
    res.status(201).json(skill);
  } catch (e) {
    next(e);
  }
});

export default router;
