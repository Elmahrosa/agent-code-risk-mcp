import express from "express";

const app = express();
app.get("/", (req, res) => res.status(200).send("OK"));
app.get("/health", (req, res) => res.status(200).json({ ok: true }));

const port = Number(process.env.PORT || 8000);
app.listen(port, "0.0.0.0", () => console.log("HTTP on", port));
