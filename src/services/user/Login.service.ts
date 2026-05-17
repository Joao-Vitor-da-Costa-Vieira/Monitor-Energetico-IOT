import { LoginRequestDto } from "../../dtos/user/LoginRequest.dto.ts";
import { LoginSingleton } from "../../singleton/user/login.sigleton.ts";
import { SetPlaceMeasureReqDto } from "../../dtos/place/SetPlaceMeasureReq.dto.ts";
import UserService from "./User.service.ts";
import PlaceService from "../place/Place.service.ts";
import { CreatePlaceDto } from "../../dtos/place/CreatePlace.dto.ts";
import { GetPlaceDto } from "../../dtos/place/GetPlace.dto.ts";
import { RequestError } from "../../errors/http/Request.error.ts";
import { NoDataFoundError } from "../../errors/mvc/NoDataFound.error.ts";
import { AuthorizationError } from "../../errors/http/Authorization.error.ts";
import { BussinessRuleError } from "../../errors/mvc/BussinessRule.error.ts";
import { EncryptionUtils } from "../../utils/encryption/Encryption.utils.ts";

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
            if (this.loginSingleton.$userId)
                throw new RequestError(400, "Um usuário já está conectado. É necessário desconectar da conta atual para fazer login.")
            
            const user = await this.userServ.GetByEmail(loginReq.$email);

            if (!user)
                throw new NoDataFoundError(404, `O usuário que está tentando logar não foi encontrado.`);

            if (!user.$active)
                throw new BussinessRuleError(400, `O usuário que está tentando logar não está ativo.`)

            loginReq.$pass = EncryptionUtils.encryptHash(loginReq.$pass);
            if (user.$pass !== loginReq.$pass)
                throw new AuthorizationError(401, `Senha inserida é diferente da senha cadastrada.`);

            this.loginSingleton.$userId = Number(user.$id);
        } catch (e) {
           throw e; 
        }
    }

    public async LogOutUsr() {
        try {
            if (!this.loginSingleton.$userId)
                throw new RequestError(400, "Nenhum usuário está conectado.");

            this.ClearCrtMeasurePlaceId();
            this.loginSingleton.$userId = undefined;
        } catch (e) {
            throw e;
        }
    }

    public async SetCrtMeasurePlaceId(placeReq: SetPlaceMeasureReqDto) {
        try {
            const userId = this.loginSingleton.$userId;
            let placeChoosen;

            if (!userId)
                throw new RequestError(400, "Usuário precisa estar logado para escolher um local para medição.");

            if (placeReq.$name) {
                placeChoosen = await this.ChoosePlaceByNameCrtMeasure(placeReq.$name, userId);
            } else if (placeReq.$id) {
                placeChoosen = await this.ChoosePlaceByIdCrtMeasure(placeReq.$id, userId);
            } else {
                throw new BussinessRuleError(400, "Para escolher um local para medição, é necessário informar o nome do local ou seu ID.");
            }

            if (!placeChoosen.$active)
                throw new RequestError(400, `O local com ID ${placeChoosen.$id} não está ativo.`);
            
            this.loginSingleton.$placeId = Number(placeChoosen.$id);
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

            console.log(placeChoosen)

            if (!placeChoosen)
                throw new NoDataFoundError(404, `Nenhum local com ID ${plc_id} foi encontrado.`);
            else if (placeChoosen.$usr_id != usr_id) {
                throw new RequestError(400, `O local com ID ${plc_id} está registrado na conta de um usuário diferente do atual.`)
            }

            return placeChoosen;
        } catch (e) {
            throw e;
        }
    }

    public async GetCrtMeasurePlaceId() : Promise<number | undefined> {
        try {
            if (!this.loginSingleton.$userId)
                throw new RequestError(400, "Um usuário precisa estar logado para ler o local da nova medição.");

            return this.loginSingleton.$placeId;
        } catch (e) {
            throw e;
        }
    }

    public async ClearCrtMeasurePlaceId() {
        try {
            if (!this.loginSingleton.$userId)
                throw new RequestError(400, "Um usuário precisa estar logado para apagar o local da nova medição.");

            this.loginSingleton.$placeId = undefined;
        } catch (e) {
            throw e;
        }
    }
}