import { Prisma, TutorProfile } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { AvailabilitySlot } from "../../type/availability";

const createTutor = async (data: Omit<TutorProfile, 'id' | 'createdAt' | 'updatedAt' | 'userId'>, userId:string ) => {
    const result = await prisma.tutorProfile.create({
        data: {
            ...data,
            userId: userId,
            
            availability: data.availability as AvailabilitySlot[] as Prisma.InputJsonValue
        }
    })
    return result
}

export const tutorProfileService = {
    createTutor
}