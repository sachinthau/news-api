import express from "express";

const app = express();

app.get("/health", (_req, res) => res.json({ ok: true }));

const PORT = Number(3000);

app.listen(PORT, () => {
  console.log(`News API server listening on http://localhost:${PORT}`);
});