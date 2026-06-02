import "dotenv/config";
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../config/auth";
import { authRoutes } from "./routes/auth.routes";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        standardHeaders: true,
        legacyHeaders: false,
    })
);

app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.all("/api/auth/*path", toNodeHandler(auth));

app.get('/', (req, res) => {
    res.send("ok");
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

export { app };