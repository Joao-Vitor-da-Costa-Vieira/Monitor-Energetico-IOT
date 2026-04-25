import { Request, Response } from "express";
import { LoginService } from "../../services/user/Login.service.ts"
import { LoginRequestDto } from "../../dtos/user/LoginRequest.dto.ts";
import { SetPlaceMeasureReqDto } from "../../dtos/place/SetPlaceMeasureReq.dto.ts";

export class LoginController {
    private static instance : LoginController;
    private loginServ : LoginService;

    private constructor() {
        this.loginServ = LoginService.GetInstance();
    }

    public static GetInstance() : LoginController {
        if (!this.instance)
            this.instance = new LoginController();

        return this.instance;
    }

    public GetLoggedUsr = async (req: Request, res: Response) => {
        try {
            const loggedUsr = await this.loginServ.GetLoggedUsr();

            return res.status(200).json({
                usrId: loggedUsr
            });
        } catch (e: any) {
            console.error(e);
            return res.status(500).json({
                exception: e.message
            });
        }
    }

    public LoginAsUser = async (req: Request, res: Response) => {
        try {
            const loginReq = new LoginRequestDto(
                req.body.email,
                req.body.pass
            );

            await this.loginServ.SetLoggedUsr(loginReq);

            return res.status(200).json({
                message: `Usuário conectado com sucesso`
            });
        } catch (e: any) {
            console.error(e);
            return res.status(500).json({
                exception: e.message
            });
        }
    }

    public LogOutUser = async (req: Request, res: Response) => {
        try {
            if (!(await this.loginServ.GetLoggedUsr()))
                return res.status(200).json({
                    message: "Nenhum usuário estava conectado."
                })

            await this.loginServ.LogOutUsr();

            return res.status(200).json({
                message: "Usuário desconectado com sucesso."
            });
        } catch (e: any) {
            console.error(e);
            return res.status(500).json({
                exception: e.message
            });
        }
    }

    public GetMeasurementPlaceId = async (req: Request, res: Response) => {
        try {
            const plcId = await this.loginServ.GetCrtMeasurePlaceId();

            return res.status(200).json({
                placeId: plcId
            })
        } catch (e: any) {
            console.error(e);
            return res.status(500).json({
                exception: e.message
            })
        }
    }

    public ChooseMeasurementPlace = async (req: Request, res: Response) => {
        try {
            let value;

            if (req.body.type == "id") {
                value = new SetPlaceMeasureReqDto(Number(req.body.value));
            } else if (req.body.type == "name") {
                value = new SetPlaceMeasureReqDto(req.body.value + "");
            } else {
                throw new Error("Informar tipo de valor sendo usado para escolha de local de medição (\"id\" ou \"name\").")
            }

            await this.loginServ.SetCrtMeasurePlaceId(value);

            return res.status(200).json({
                message: "Local para criação de medição definido com sucesso."
            })
        } catch (e: any) {
            console.error(e);
            return res.status(500).json({
                exception: e.message
            });
        }
    }

    public ClearMeasurementPlace = async (req: Request, res: Response) => {
        try {
            await this.loginServ.ClearCrtMeasurePlaceId();

            return res.status(200).json({
                message: "Local para criação de medição apagado com sucesso."
            })
        } catch (e: any) {
            console.error(e);
            return res.status(500).json({
                exception: e.message
            })
        }
    }
}