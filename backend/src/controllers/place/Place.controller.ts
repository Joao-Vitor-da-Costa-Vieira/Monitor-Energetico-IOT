import { Request, Response } from "express";
import PlaceService from "../../services/place/Place.service.ts";
import { LoginService } from "../../services/user/Login.service.ts";
import { ResponseUtils } from "../../utils/response/Response.utils.ts";
import { RequestError } from "../../errors/http/Request.error.ts";
import { CreatePlaceDto } from "../../dtos/place/CreatePlace.dto.ts";
import { AbstractApiError } from "../../errors/AbstractApi.error.ts";
import { PlaceResponseDto } from "../../dtos/place/PlaceResponse.dto.ts";
import { NoDataFoundError } from "../../errors/mvc/NoDataFound.error.ts";
import { UpdatePlaceDto } from "../../dtos/place/UpdatePlace.dto.ts";

export class PlaceController {
    private static instance : PlaceController;
    private loginServ : LoginService;
    private placeServ : PlaceService;

    private constructor() {
        this.loginServ = LoginService.GetInstance();
        this.placeServ = PlaceService.GetInstance();
    }

    public static GetInstance() {
        if (!this.instance)
            this.instance = new PlaceController();

        return this.instance;
    }

    public CreatePlaceForCurUsr = async (req: Request, res: Response) => {
        try {
            const loggedUsr = await this.loginServ.GetLoggedUsr();

            if (!loggedUsr)
                throw new RequestError(400, "Nenhum usuário está conectado para adicionar um local novo.");

            if (!("name" in req.body))
                throw new RequestError(400, "Requisição não tem campo \"name\".");

            const createPlcDto = new CreatePlaceDto(
                req.body.name,
                loggedUsr,
            )

            const createdPlace = await this.placeServ.Create(createPlcDto);
            
            const placeRes = new PlaceResponseDto(createdPlace);
            
            return ResponseUtils.returnObjectResponse(res, placeRes);
        } catch (e: any) {
            return e instanceof AbstractApiError ?
                ResponseUtils.returnApiErrorResponse(res, e) :
                ResponseUtils.returnGenericErrorResponse(res, e);
        }
    }

    public GetPlaceByPlcId = async (req: Request, res: Response) => {
        try {
            if (!("id" in req.params))
                throw new RequestError(400, "Nenhum ID foi fornecido.");

            const id = Number(req.params.id);

            const place = await this.placeServ.GetById(id);

            if (!place)
                throw new NoDataFoundError(404, "Nenhum local com o ID fornecido foi encontrado.");

            const placeRes = new PlaceResponseDto(place);

            return ResponseUtils.returnObjectResponse(res, placeRes);
        } catch (e: any) {
            return e instanceof AbstractApiError ?
                ResponseUtils.returnApiErrorResponse(res, e) :
                ResponseUtils.returnGenericErrorResponse(res, e);
        }
    }

    public GetPlaceByUsrId = async (req: Request, res: Response) => {
        try {
            if (!("id" in req.params))
                throw new RequestError(400, "Nenhum ID foi fornecido.");

            const id = Number(req.params.id);

            const usrPlaces = await this.placeServ.GetAllActiveByUserId(id);

            return ResponseUtils.returnObjectResponse(res, usrPlaces);
        } catch (e: any) {
            return e instanceof AbstractApiError ?
                ResponseUtils.returnApiErrorResponse(res, e) :
                ResponseUtils.returnGenericErrorResponse(res, e);
        }
    }

    public UpdatePlace = async (req: Request, res: Response) => {
        try {
            if (!("id" in req.params))
                throw new RequestError(400, "Nenhum ID foi fornecido.");
            
            const searchId = Number(req.params.id);

            if (typeof searchId != "number")
                throw new RequestError(400, "ID precisa ser um valor numérico.");

            if (searchId < 1)
                throw new RequestError(400, "ID é valor numérico maior que 0.");

            const updateDto = new UpdatePlaceDto(
                searchId,
                req.body.name,
                req.body.usrId
            )

            const updatedPlc = await this.placeServ.Update(updateDto);

            const placeResDto = new PlaceResponseDto(updatedPlc);

            return ResponseUtils.returnObjectResponse(res, placeResDto);
        } catch (e: any) {
            return e instanceof AbstractApiError ?
                ResponseUtils.returnApiErrorResponse(res, e) :
                ResponseUtils.returnGenericErrorResponse(res, e);
        }
    }

    public DeactivatePlace = async (req: Request, res: Response) => {
        try {
            if (!("id" in req.params))
                throw new RequestError(400, "Nenhum ID foi fornecido.");

            const searchId = Number(req.params.id);

            if (typeof searchId != "number")
                throw new RequestError(400, "ID precisa ser um valor numérico.");

            if (searchId < 1)
                throw new RequestError(400, "ID é valor numérico maior que 0.");

            await this.placeServ.Deactivate(searchId);

            return ResponseUtils.returnObjectResponse(res, {"message": "Local desativado com sucesso."});
        } catch (e: any) {
            return e instanceof AbstractApiError ?
                ResponseUtils.returnApiErrorResponse(res, e) :
                ResponseUtils.returnGenericErrorResponse(res, e);
        }
    }

    public ActivatePlace = async (req: Request, res: Response) => {
        try {
            if (!("id" in req.params))
                throw new RequestError(400, "Nenhum ID foi fornecido.");

            const searchId = Number(req.params.id);

            if (typeof searchId != "number")
                throw new RequestError(400, "ID precisa ser um valor numérico.");

            if (searchId < 1)
                throw new RequestError(400, "ID é valor numérico maior que 0.");

            await this.placeServ.Activate(searchId);

            return ResponseUtils.returnObjectResponse(res, {"message": "Local ativado com sucesso."});
        } catch (e: any) {
            return e instanceof AbstractApiError ?
                ResponseUtils.returnApiErrorResponse(res, e) :
                ResponseUtils.returnGenericErrorResponse(res, e);
        }
    }
}