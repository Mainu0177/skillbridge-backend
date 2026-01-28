import express, { Router } from "express"
import { TutorController } from "./tutor.controller";

const router = express.Router()

router.post("/", TutorController.createTutor);

export const tutorRouter: Router = router

