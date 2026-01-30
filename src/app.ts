import express, { Application } from "express";
import cors from "cors"

import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { tutorRouter } from "./modules/tutorProfile/tutor.router";


const app: Application = express();

app.use(cors({
    origin: process.env.APP_URL || "http://localhost:4000"
}))

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.use("/api/tutors", tutorRouter)

app.get("/", (req, res) => {
    res.send("Hello Developers")
})

export default app;


