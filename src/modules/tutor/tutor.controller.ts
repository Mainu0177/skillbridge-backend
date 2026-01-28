import { Request, Response } from "express"


const createTutor = async (req: Request, res: Response) => {
    console.log({req, res})
}

export const TutorController = {
    createTutor
}