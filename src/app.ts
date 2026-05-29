import express from "express";
import type { Request, Response } from "express";
import * as dotenv from 'dotenv';
import deviceRouter from "./routers/device/Device.routers.ts";
import loginRouter from "./routers/login/Login.router.ts";
import userRouter from "./routers/user/User.router.ts";
import placeRouter from "./routers/place/Place.router.ts";
import measureRouter from "./routers/measurement/Measurement.router.ts"

dotenv.config();

const APP = express();
const PORT = 3000;

APP.use(express.json())
APP.use("/device", deviceRouter);
APP.use("/login", loginRouter);
APP.use("/user", userRouter);
APP.use("/place", placeRouter);
APP.use("/measure", measureRouter);

//APP.listen(PORT, () => {console.log(`Sistema rondando em http://localhost:${PORT}`);})
export default APP;