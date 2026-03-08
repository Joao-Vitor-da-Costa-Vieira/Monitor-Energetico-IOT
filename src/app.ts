import express, { Request, Response } from "express";
import * as dotenv from 'dotenv'

dotenv.config();

const APP = express();
const PORT = 3000;

APP.get('/', (req: Request, res: Response) => {
    res.send("Funcionando!");
});

APP.listen(PORT, () => {
    console.log(`Sistema rondando em https://localhost:${PORT}`);
})