import express from "express";
import nodemailer from "nodemailer";
import { prisma } from "./pisma"; 

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    return res.json("Api rodando")
})

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "6d870c54d21686",
      pass: "c3f5028207935a"
    }
  });

app.post("/feedbacks", async (req, res) => {

    const { comment, type, screenshot } = req.body

    const feedback = await prisma.feedback.create({
        data: {
            type,
            comment,
            screenshot
        }
    })

    await transport.sendMail({
        from: 'Equipe Feedget <oi@feedget.com>',
        to: 'Ikaro Montanari <ikaro.montanari@hotmail.com>',
        subject: 'Novo Feedback',
        html: [
            `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
            `<h1>Tipo do feedback: ${type}</h1>`,
            `<p>Comentário: ${comment}</p>`,
            `</div>` 

        ].join('\n')
    })

    return res.status(201).json({ data: feedback })
})

const port = 3333


app.listen(port, () =>{
    console.log(`Servidor rodando na porta ${port}`)
})