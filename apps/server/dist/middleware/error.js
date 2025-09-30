export const notFound = (_req, res) => {
    res.status(404).json({ error: "Not Found" });
};
export const onError = (err, _req, res, _next) => {
    const status = typeof err?.status === "number" ? err.status : 500;
    const message = status >= 500
        ? "Internal Error"
        : err?.message ?? "Error";
    res.status(status).json({ error: message });
};
