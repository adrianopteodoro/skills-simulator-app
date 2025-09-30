import type { RequestHandler, ErrorRequestHandler } from "express";

export const notFound: RequestHandler = (_req, res) => {
  res.status(404).json({ error: "Not Found" });
};

export const onError: ErrorRequestHandler = (err, _req, res, _next) => {
  const status =
    typeof (err as any)?.status === "number" ? (err as any).status : 500;

  const message =
    status >= 500
      ? "Internal Error"
      : ((err as any)?.message as string | undefined) ?? "Error";

  res.status(status).json({ error: message });
};
