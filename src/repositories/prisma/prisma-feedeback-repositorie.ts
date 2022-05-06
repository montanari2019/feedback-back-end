import { prisma } from "../../pisma";
import { FeedbackCreateData, FeedbacksRepository } from "../feedbacks-repositories";

export class PrismaFeedbacksRepository implements FeedbacksRepository{
    async create({ type, comment, screenshot}: FeedbackCreateData){
        await prisma.feedback.create({
            data: {
                type,
                comment,
                screenshot
            }
        })
    }
}