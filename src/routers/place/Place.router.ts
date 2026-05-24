import express from "express";
import { PlaceController } from "../../controllers/place/Place.controller.ts";

const router = express.Router();
const placeCont = PlaceController.GetInstance();

// Locais
router.post("/CreatePlaceLogged", placeCont.CreatePlaceForCurUsr);
router.get("/GetPlace/:id", placeCont.GetPlaceByPlcId);
router.get("/GetPlace/Usr/:id", placeCont.GetPlaceByUsrId);
router.patch("/UpdatePlace/:id", placeCont.UpdatePlace);
router.patch("/DeactivatePlace/:id", placeCont.DeactivatePlace);
router.patch("/ActivatePlace/:id", placeCont.ActivatePlace);

export default router;