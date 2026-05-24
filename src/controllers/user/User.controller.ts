import { Response, Request } from "express"
import { CreateUserDto } from "../../dtos/user/CreateUser.dto.ts";
import UserService from "../../services/user/User.service.ts";
import { RequestError } from "../../errors/http/Request.error.ts";
import { NoDataFoundError } from "../../errors/mvc/NoDataFound.error.ts";
import { UpdateUserDto } from "../../dtos/user/UpdateUser.dto.ts";
import { UserResponseDto } from "../../dtos/user/UserResponse.dto.ts";
import { AbstractApiError } from "../../errors/AbstractApi.error.ts";
import { ResponseUtils } from "../../utils/response/Response.utils.ts";

export class UserController {
    private static instance : UserController;
    private userServ : UserService;

    private constructor() {
        this.userServ = UserService.GetInstance();
    }

    public static GetInstance() : UserController {
        if (!this.instance)
            this.instance = new UserController();

        return this.instance;
    }

    public CreateAccount = async (req: Request, res: Response) => {
        try {
            const createUserDto = new CreateUserDto(
                req.body.name,
                req.body.email,
                req.body.pass
            )

            const createdUser = await this.userServ.Create(createUserDto);

            const resUserDto = new UserResponseDto(createdUser);

            return ResponseUtils.returnObjectResponse(res, resUserDto)
        } catch (e: any) {
            return e instanceof AbstractApiError ?
                ResponseUtils.returnApiErrorResponse(res, e) :
                ResponseUtils.returnGenericErrorResponse(res, e);
        }
    }

    public GetUser = async (req: Request, res: Response) => {
        try {
            const searchId = Number(req.params.id);

            if (typeof searchId != "number")
                throw new RequestError(400, "ID precisa ser um valor numérico.");

            if (searchId < 1)
                throw new RequestError(400, "ID é valor numérico maior que 0.");

            const userDto = await this.userServ.GetById(searchId);

            if (!userDto) {
                throw new NoDataFoundError(404, `Nenhum usuário com ID ${searchId} foi encontrado.`);
            } else {
                const userRes = new UserResponseDto(userDto);

                return ResponseUtils.returnObjectResponse(res, userRes);
            }
        } catch (e: any) {
            return e instanceof AbstractApiError ?
                ResponseUtils.returnApiErrorResponse(res, e) :
                ResponseUtils.returnGenericErrorResponse(res, e);
        }
    }

    public UpdateAccount = async (req: Request, res: Response) => {
        try {
            const searchId = Number(req.params.id);

            if (typeof searchId != "number")
                throw new RequestError(400, "ID precisa ser um valor numérico.");

            if (searchId < 1)
                throw new RequestError(400, "ID é valor numérico maior que 0.");

            const updateDto = new UpdateUserDto(
                searchId,
                req.body.name,
                req.body.email,
                req.body.pass
            )

            const userDto = await this.userServ.Update(updateDto);

            const resUserDto = new UserResponseDto(userDto);

            return ResponseUtils.returnObjectResponse(res, resUserDto)
        } catch (e: any) {
            return e instanceof AbstractApiError ?
                ResponseUtils.returnApiErrorResponse(res, e) :
                ResponseUtils.returnGenericErrorResponse(res, e);
        }
    }

    public DeactivateAccount = async (req: Request, res: Response) => {
        try {
            const searchId = Number(req.params.id);

            if (typeof searchId != "number")
                throw new RequestError(400, "ID precisa ser um valor numérico.");

            if (searchId < 1)
                throw new RequestError(400, "ID é valor numérico maior que 0.");

            await this.userServ.Deactivate(searchId);

            return ResponseUtils.returnObjectResponse(res, {"message": "Conta desativada com sucesso."});
        } catch (e: any) {
            return e instanceof AbstractApiError ?
                ResponseUtils.returnApiErrorResponse(res, e) :
                ResponseUtils.returnGenericErrorResponse(res, e);
        }
    }

    public ActivateAccount = async (req: Request, res: Response) => {
        try {
            const searchId = Number(req.params.id);

            if (typeof searchId != "number")
                throw new RequestError(400, "ID precisa ser um valor numérico.");

            if (searchId < 1)
                throw new RequestError(400, "ID é valor numérico maior que 0.");

            await this.userServ.Activate(searchId);

            return ResponseUtils.returnObjectResponse(res, {"message": "Conta ativada com sucesso."});
        } catch (e: any) {
            return e instanceof AbstractApiError ?
                ResponseUtils.returnApiErrorResponse(res, e) :
                ResponseUtils.returnGenericErrorResponse(res, e);
        }
    }
}