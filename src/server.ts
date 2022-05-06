import express from "express";
import cors from "cors";

import { routes } from "./routes";

const app = express();

app.use(cors());
app.use(express.json());


// Confiuguraçãop do Email


app.use(routes)


const port = 3333

app.listen(port, () =>{
    console.log(`Servidor rodando na porta ${port}`)
})