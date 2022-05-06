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

    // Criando o feedback
    await submitFeedbackUseCase.execute({
        type,
        comment,
        screenshot
    })

    return res.status(201).send()
})


exports = routes