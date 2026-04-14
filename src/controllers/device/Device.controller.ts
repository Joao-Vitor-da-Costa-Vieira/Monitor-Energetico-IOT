import { LoginService } from "../../services/user/Login.service.ts";
import MeasurementService from "../../services/measurement/Measurement.service.ts";
import { CreateMeasurementDto } from "../../dtos/measurement/CreateMeasurement.dto.ts";
import { Request, Response } from "express";

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
            console.log(req.body)

            const user = await this.loginServ.GetLoggedUsr()

            if (!user)
                throw new Error("Usuário não está conectado.")

            const measureDto = new CreateMeasurementDto(
                new Date(Date.now()).toISOString(),
                req.body.current,
                req.body.power,
                user,
            )

            const placeId = await this.loginServ.GetCrtMeasurePlaceId();
            if (placeId)
                measureDto.$plc_id = placeId;

            const createdMeasure = this.measureServ.Create(measureDto);

            res.send(createdMeasure);
        } catch (e) {
            console.error(e);
            res.send(e)
        }
    }
}