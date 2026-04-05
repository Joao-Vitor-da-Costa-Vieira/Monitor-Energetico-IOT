import { LoginRequestDto } from "../../dtos/user/LoginRequest.dto.ts";
import { LoginSingleton } from "../../singleton/user/login.sigleton";
import UserService from "./User.service.ts";

export class LoginService {
    private static instance : LoginService;
    private userService : UserService;
    private loginSingleton : LoginSingleton;

    private constructor() {
        this.userService = UserService.GetInstance();
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
            const user = await this.userService.GetByEmail(loginReq.$email);

            if (!user)
                throw new Error(`O usuário que está tentando logar não foi encontrado.`);

            if (user.$pass !== loginReq.$pass)
                throw new Error(`Senha inserida é diferente da senha cadastrada`)

            this.loginSingleton.$userId = user.$id;
        } catch (e) {
           throw e; 
        }
    }

    public async LogOutUsr() {
        try {
            this.loginSingleton.$userId = undefined;
        } catch (e) {
            throw e;
        }
    }
}