import { Request, Response } from "express"
import { tutorProfileService } from "./tutor.service"


const createTutor = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id
        const result = await tutorProfileService.createTutor(req.body, userId)

        res.status(201).json({
            success: true,
            message: "Tutor created successfully",
            data: result
        })
    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const TutorController = {
    createTutor
}