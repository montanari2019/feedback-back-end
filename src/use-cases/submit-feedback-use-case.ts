import { MailAdapter } from "../adapters/mail-adpter"
import { FeedbacksRepository } from "../repositories/feedbacks-repositories"

interface SubmitFeedbackUseCaseRequest {
    type: string,
    comment: string,
    screenshot?: string
}

export class SubmitFeedbackUseCase {

    constructor(
       private feedbackRepository: FeedbacksRepository,
       private mailAdapter: MailAdapter
    ){}

    
    async execute(request: SubmitFeedbackUseCaseRequest){
        const { type, comment, screenshot } = request

        await this.feedbackRepository.create({
            type,
            comment,
            screenshot
        })

        await this.mailAdapter.sendMail({
            subject:"Novo Feedback",
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
                `<h1>Tipo do feedback: ${type}</h1>`,
                `<p>Comentário: ${comment}</p>`,
                `</div>` 
    
            ].join('\n')
        })
    }
}