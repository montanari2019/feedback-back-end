import express from "express";
import { prisma } from "./pisma";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    return res.json("Api rodando")
})

app.post("/feedbacks", async (req, res) => {

    const { comment, type, screenshot } = req.body

    const feedback = await prisma.feedback.create({
        data: {
            type,
            comment,
            screenshot
        }
    })

    return res.status(201).json({ data: feedback })
})

const port = 3333


app.listen(port, () =>{
    console.log(`Servidor rodando na porta ${port}`)
})