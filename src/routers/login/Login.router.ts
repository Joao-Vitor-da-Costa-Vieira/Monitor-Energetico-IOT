import express from "express";
import { LoginController } from "../../controllers/login/Login.controller.ts";

const router = express.Router();
const loginCont = LoginController.GetInstance();

// Usuário
router.get("/GetLoggedUsr", loginCont.GetLoggedUsr);
router.put("/LoginAsUser", loginCont.LoginAsUser);
router.put("/LogOutUser", loginCont.LogOutUser);

// Local
router.get("/GetNewMeasurePlace", loginCont.GetMeasurementPlaceId);
router.put("/SetNewMeasurePlace", loginCont.ChooseMeasurementPlace);
router.put("/ClearNewMeasurePlace", loginCont.ClearMeasurementPlace);

export default router;