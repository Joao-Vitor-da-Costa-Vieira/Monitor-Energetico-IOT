import express, { Request, Response } from "express";
import * as dotenv from 'dotenv'
import deviceRouter from "./routers/device/Device.routers.ts";
import loginRouter from "./routers/login/Login.router.ts";

dotenv.config();

const APP = express();
const PORT = 3000;

APP.use(express.json())
APP.use("/device", deviceRouter);
APP.use("/login", loginRouter);

APP.listen(PORT, () => {
    console.log(`Sistema rondando em https://localhost:${PORT}`);
})