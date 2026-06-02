import express from "express";
import { UserController } from "../../controllers/user/User.controller.ts";

const router = express.Router();
const loginCont = UserController.GetInstance();

// Usuário
router.post("/CreateAccount", loginCont.CreateAccount);
router.get("/GetUser/:id", loginCont.GetUser);
router.patch("/UpdateAccount/:id", loginCont.UpdateAccount);
router.patch("/DeactivateAccount/:id", loginCont.DeactivateAccount);
router.patch("/ActivateAccount/:id", loginCont.ActivateAccount);

export default router;