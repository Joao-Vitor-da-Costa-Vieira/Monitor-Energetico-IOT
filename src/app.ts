import express from "express";
import type { Request, Response } from "express";
import * as dotenv from 'dotenv';
import deviceRouter from "./routers/device/Device.routers.ts";
import loginRouter from "./routers/login/Login.router.ts";
import userRouter from "./routers/user/User.router.ts";

dotenv.config();

const APP = express();
const PORT = 3000;

APP.use(express.json())
APP.use("/device", deviceRouter);
APP.use("/login", loginRouter);
APP.use("/user", userRouter);

APP.listen(PORT, () => {console.log(`Sistema rondando em http://localhost:${PORT}`);})
//a
//export default APP;