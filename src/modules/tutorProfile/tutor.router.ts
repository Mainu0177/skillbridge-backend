import express, { Router } from "express"
import { TutorController } from "./tutor.controller";
import auth, { UserRole } from "../../middlewares/auth";

const router = express.Router()

router.post("/", auth(UserRole.TUTOR),TutorController.createTutor);

export const tutorRouter: Router = router

