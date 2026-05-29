import express from "express";
import { MeasurementController } from "../../controllers/measurement/Measurement.controller.ts";

const router = express.Router();
const measureCont = MeasurementController.GetInstance();

router.get("/GetMeasure/:id", measureCont.GetMeasureByMeaId);
router.get("/GetMeasure/User/:id", measureCont.GetMeasuresByUsrId);
router.get("/GetMeasure/Place/:id", measureCont.GetMeasuresByPlcId);
router.delete("/Delete", measureCont.DeleteMeasuresByIds);

export default router;