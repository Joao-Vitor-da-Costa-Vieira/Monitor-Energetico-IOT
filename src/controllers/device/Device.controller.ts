import { LoginService } from "../../services/user/Login.service.ts";
import MeasurementService from "../../services/measurement/Measurement.service.ts";
import { CreateMeasurementDto } from "../../dtos/measurement/CreateMeasurement.dto.ts";
import { Request, Response } from "express";
import { AbstractApiError } from "../../errors/AbstractApi.error.ts";
import { RequestError } from "../../errors/http/Request.error.ts";
import { ResponseUtils } from "../../utils/response/Response.utils.ts";

export class DeviceController {
    private static instance : DeviceController;
    private measureServ : MeasurementService;
    private loginServ : LoginService;

    private constructor() {
        this.measureServ = MeasurementService.GetInstance();
        this.loginServ = LoginService.GetInstance();
    }

    public static GetInstance() {
        if (!this.instance)
            this.instance = new DeviceController();

        return this.instance;
    }

    public SaveMeasureData = async (req: Request, res: Response) => {
        try {
            const user = await this.loginServ.GetLoggedUsr()

            if (!user)
                throw new RequestError(400, "Usuário não está conectado.")

            const measureDto = new CreateMeasurementDto(
                new Date(Date.now()).toISOString(),
                req.body.current,
                req.body.power,
                user,
            )

            const placeId = await this.loginServ.GetCrtMeasurePlaceId();
            if (placeId)
                measureDto.$plc_id = placeId;

            await this.measureServ.Create(measureDto);

            return ResponseUtils.ReturnObjectResponse(res, {message: "sucess"});
        } catch (e: any) {
            return e instanceof AbstractApiError ?
                ResponseUtils.ReturnApiErrorResponse(res, e) :
                ResponseUtils.returnGenericErrorResponse(res, e);
        }
    }
}