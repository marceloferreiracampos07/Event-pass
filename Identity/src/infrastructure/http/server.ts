import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../config/auth";

const app = express();
const PORT = process.env.PORT || 3001;

app.all("/api/auth", toNodeHandler(auth));

app.get('/', (req, res) => {
    res.send("ok");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});