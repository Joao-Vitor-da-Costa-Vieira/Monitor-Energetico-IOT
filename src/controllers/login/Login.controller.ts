import { Request, Response } from "express";
import { LoginService } from "../../services/user/Login.service.ts"
import { LoginRequestDto } from "../../dtos/user/LoginRequest.dto.ts";
import { SetPlaceMeasureReqDto } from "../../dtos/place/SetPlaceMeasureReq.dto.ts";
import { AbstractApiError } from "../../errors/AbstractApi.error.ts";
import { RequestError } from "../../errors/http/Request.error.ts";
import { ResponseUtils } from "../../utils/response/Response.utils.ts";

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

            return ResponseUtils.ReturnObjectResponse(res, {usrId: loggedUsr});
        } catch (e: any) {
            return e instanceof AbstractApiError ?
                ResponseUtils.ReturnApiErrorResponse(res, e) :
                ResponseUtils.returnGenericErrorResponse(res, e);
        }
    }

    public LoginAsUser = async (req: Request, res: Response) => {
        try {
            const loginReq = new LoginRequestDto(
                req.body.email,
                req.body.pass
            );

            await this.loginServ.SetLoggedUsr(loginReq);

            return ResponseUtils.ReturnObjectResponse(res, {message: `Usuário conectado com sucesso`});
        } catch (e: any) {
            return e instanceof AbstractApiError ?
                ResponseUtils.ReturnApiErrorResponse(res, e) :
                ResponseUtils.returnGenericErrorResponse(res, e);
        }
    }

    public LogOutUser = async (req: Request, res: Response) => {
        try {
            await this.loginServ.LogOutUsr();

            return ResponseUtils.ReturnObjectResponse(res, {message: "Usuário desconectado com sucesso."});
        } catch (e: any) {
            return e instanceof AbstractApiError ?
                ResponseUtils.ReturnApiErrorResponse(res, e) :
                ResponseUtils.returnGenericErrorResponse(res, e);
        }
    }

    public GetMeasurementPlaceId = async (req: Request, res: Response) => {
        try {
            const plcId = await this.loginServ.GetCrtMeasurePlaceId();

            return ResponseUtils.ReturnObjectResponse(res, {placeId: plcId})
        } catch (e: any) {
            return e instanceof AbstractApiError ?
                ResponseUtils.ReturnApiErrorResponse(res, e) :
                ResponseUtils.returnGenericErrorResponse(res, e);
        }
    }

    public ChooseMeasurementPlace = async (req: Request, res: Response) => {
        try {
            let value;

            if (req.body.type == "id") {
                if (!Number.isFinite(req.body.value))
                    throw new RequestError(400, "ID precisa ser um valor numérico.")

                value = new SetPlaceMeasureReqDto(Number(req.body.value));
            } else if (req.body.type == "name") {
                if (typeof req.body.value !== 'string')
                    throw new RequestError(400, "Nome precisa ser um valor alfanumérico.")

                value = new SetPlaceMeasureReqDto(req.body.value + "");
            } else {
                throw new RequestError(400, "Informar tipo de valor sendo usado para escolha de local de medição ('id' ou 'name').")
            }

            await this.loginServ.SetCrtMeasurePlaceId(value);

            return ResponseUtils.ReturnObjectResponse(res, {message: "Local para criação de medição definido com sucesso."})
        } catch (e: any) {
            return e instanceof AbstractApiError ?
                ResponseUtils.ReturnApiErrorResponse(res, e) :
                ResponseUtils.returnGenericErrorResponse(res, e);
        }
    }

    public ClearMeasurementPlace = async (req: Request, res: Response) => {
        try {
            await this.loginServ.ClearCrtMeasurePlaceId();

            return ResponseUtils.ReturnObjectResponse(res, {message: "Local para criação de medição apagado com sucesso."});
        } catch (e: any) {
            return e instanceof AbstractApiError ?
                ResponseUtils.ReturnApiErrorResponse(res, e) :
                ResponseUtils.returnGenericErrorResponse(res, e);
        }
    }
}