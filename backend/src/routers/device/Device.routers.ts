import express from "express";
import { DeviceController } from "../../controllers/device/Device.controller.ts";

const router = express.Router();
const deviceCont = DeviceController.GetInstance();

router.post("/", deviceCont.SaveMeasureData);

export default router;

