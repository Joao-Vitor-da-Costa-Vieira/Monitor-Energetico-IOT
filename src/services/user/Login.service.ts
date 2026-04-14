import { LoginRequestDto } from "../../dtos/user/LoginRequest.dto.ts";
import { LoginSingleton } from "../../singleton/user/login.sigleton";
import { SetPlaceMeasureReqDto } from "../../dtos/place/SetPlaceMeasureReq.dto.ts";
import UserService from "./User.service.ts";
import PlaceService from "../place/Place.service.ts";
import { CreatePlaceDto } from "../../dtos/place/CreatePlace.dto.ts";
import { GetPlaceDto } from "../../dtos/place/GetPlace.dto.ts";

export class LoginService {
    private static instance : LoginService;
    private userServ : UserService;
    private placeServ : PlaceService;
    private loginSingleton : LoginSingleton;

    private constructor() {
        this.userServ = UserService.GetInstance();
        this.placeServ = PlaceService.GetInstance();
        this.loginSingleton = LoginSingleton.GetInstance();
    }

    public static GetInstance() : LoginService {
        if (!this.instance)
            this.instance = new LoginService();

        return this.instance;
    }

    public async GetLoggedUsr() : Promise<number | undefined> {
        try {
            return this.loginSingleton.$userId;
        } catch (e) {
            throw e;
        }
    }

    public async SetLoggedUsr(loginReq: LoginRequestDto) {
        try {
            const user = await this.userServ.GetByEmail(loginReq.$email);

            if (!user)
                throw new Error(`O usuário que está tentando logar não foi encontrado.`);

            if (user.$pass !== loginReq.$pass)
                throw new Error(`Senha inserida é diferente da senha cadastrada.`)

            this.loginSingleton.$userId = user.$id;
        } catch (e) {
           throw e; 
        }
    }

    public async LogOutUsr() {
        try {
            this.loginSingleton.$userId = undefined;
            this.ClearCrtMeasurePlaceId();
        } catch (e) {
            throw e;
        }
    }

    public async SetCrtMeasurePlaceId(placeReq: SetPlaceMeasureReqDto) {
        try {
            const userId = this.loginSingleton.$userId;
            let placeChoosen;

            if (!userId)
                throw new Error("Usuário precisa estar logado para escolher um local para medição.");

            if (placeReq.$name) {
                placeChoosen = await this.ChoosePlaceByNameCrtMeasure(placeReq.$name, userId);
            } else if (placeReq.$id) {
                placeChoosen = await this.ChoosePlaceByIdCrtMeasure(placeReq.$id, userId);
            } else {
                throw new Error("Para escolher um local para medição, é necessário informar o nome do local ou seu ID.");
            }
            
            this.loginSingleton.$placeId = placeChoosen.$id;
        } catch (e) {
            throw e;
        }
    }

    private async ChoosePlaceByNameCrtMeasure(name: string, usr_id: number) : Promise<GetPlaceDto> {
        try {
            const userPlaces = await this.placeServ.GetAllByUserId(usr_id);
            
            let placeChoosen = userPlaces.find((x) => x.$name === name);

            if (!placeChoosen) {
                placeChoosen = await this.placeServ.Create(new CreatePlaceDto(
                    name,
                    usr_id
                ))
            }

            return placeChoosen;
        } catch (e) {
            throw e;
        }
    }

    private async ChoosePlaceByIdCrtMeasure(plc_id: number, usr_id: number) : Promise<GetPlaceDto> {
        try {
            const placeChoosen = await this.placeServ.GetById(plc_id);

            if (!placeChoosen)
                throw new Error(`Nenhum local com ID ${plc_id} foi encontrado.`);
            else if (placeChoosen.$usr_id !== usr_id) {
                throw new Error(`O local com ID ${plc_id} está registrado na conta de um usuário diferente de ${usr_id}`)
            }

            return placeChoosen;
        } catch (e) {
            throw e;
        }
    }

    public async GetCrtMeasurePlaceId() : Promise<number | undefined> {
        try {
            return this.loginSingleton.$placeId;
        } catch (e) {
            throw e;
        }
    }

    public async ClearCrtMeasurePlaceId() {
        try {
            this.loginSingleton.$placeId = undefined;
        } catch (e) {
            throw e;
        }
    }
}