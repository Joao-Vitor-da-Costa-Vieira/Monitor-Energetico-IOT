import { Request, Response } from "express";
import MeasurementService from "../../services/measurement/Measurement.service.ts";
import { AbstractApiError } from "../../errors/AbstractApi.error.ts";
import { ResponseUtils } from "../../utils/response/Response.utils.ts";
import { RequestError } from "../../errors/http/Request.error.ts";
import { NoDataFoundError } from "../../errors/mvc/NoDataFound.error.ts";
import { MeasurementResponseDto } from "../../dtos/measurement/MeasurementResponse.dto.ts";

export class MeasurementController {
    private static instance : MeasurementController;
    private measureServ : MeasurementService;

    private constructor() {
        this.measureServ = MeasurementService.GetInstance();
    }

    public static GetInstance() {
        if (!this.instance)
            this.instance = new MeasurementController();

        return this.instance;
    }

    public GetMeasureByMeaId = async (req: Request, res: Response) => {
        try {
            if (!("id" in req.params))
                throw new RequestError(400, "Nenhum ID foi fornecido.");

            const id = Number(req.params.id);

            const measure = await this.measureServ.GetById(id);

            if (!measure)
                throw new NoDataFoundError(404, "Nenhuma medição com o ID fornecido foi encontrado.");

            const measRes = new MeasurementResponseDto(measure);

            return ResponseUtils.returnObjectResponse(res, measRes);
        } catch (e : any) {
            return (e instanceof AbstractApiError) ?
                ResponseUtils.returnApiErrorResponse(res, e) :
                ResponseUtils.returnGenericErrorResponse(res, e);
        }
    }

    public GetMeasuresByUsrId = async (req: Request, res: Response) => {
        try {
            if (!("id" in req.params))
                throw new RequestError(400, "Nenhum ID foi fornecido.");

            const id = Number(req.params.id);

            const measures = await this.measureServ.GetAllByUserId(id);

            return ResponseUtils.returnObjectResponse(res, measures);
        } catch (e: any) {
            return (e instanceof AbstractApiError) ?
                ResponseUtils.returnApiErrorResponse(res, e) :
                ResponseUtils.returnGenericErrorResponse(res, e);
        }
    }

    public GetMeasuresByPlcId = async (req: Request, res: Response) => {
        try {
            if (!("id" in req.params))
                throw new RequestError(400, "Nenhum ID foi fornecido.");

            const id = Number(req.params.id);

            const measures = await this.measureServ.GetAllByPlaceId(id);

            return ResponseUtils.returnObjectResponse(res, measures);
        } catch (e: any) {
            return (e instanceof AbstractApiError) ?
                ResponseUtils.returnApiErrorResponse(res, e) :
                ResponseUtils.returnGenericErrorResponse(res, e);
        }
    }

    public DeleteMeasuresByIds = async (req: Request, res: Response) => {
        try {
            if (!("ids" in req.body))
                throw new RequestError(400, "Nenhum ID foi fornecido.");

            const ids = req.body.ids;

            await this.measureServ.Delete(ids);

            return ResponseUtils.returnObjectResponse(res, {message: "Medições excluídas com sucesso"});
        } catch (e: any) {
            return (e instanceof AbstractApiError) ?
                ResponseUtils.returnApiErrorResponse(res, e) :
                ResponseUtils.returnGenericErrorResponse(res, e);
        }
    }
}