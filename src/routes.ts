import express from 'express';
import nodemailer from "nodemailer";
import { NodemailerMailAdapter } from './adapters/nodemiler/nodemiler-mail-adapter';
import { prisma } from "./pisma"; 
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedeback-repositorie';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';

export const routes = express.Router();

routes.get("/", (req, res) => {
    return res.json("Api rodando")
})


// Rota para cadastro de feedbacks
routes.post("/feedbacks", async (req, res) => {

    const { type, comment, screenshot } = req.body
   
    const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
    const nodemailerMailAdapter = new NodemailerMailAdapter()

    
    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
        prismaFeedbacksRepository,
        nodemailerMailAdapter
    ); 


    await submitFeedbackUseCase.execute({
        type,
        comment,
        screenshot
    })

    // await transport.sendMail({
    //     from: 'Equipe Feedget <oi@feedget.com>',
    //     to: 'Ikaro Montanari <ikaro.montanari@hotmail.com>',
    //     subject: 'Novo Feedback',
    //     html: [
    //         `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
    //         `<h1>Tipo do feedback: ${type}</h1>`,
    //         `<p>Comentário: ${comment}</p>`,
    //         `</div>` 

    //     ].join('\n')
    // })

    return res.status(201).send()
})


exports = routes