import { Response, Request } from "express"
import { CreateUserDto } from "../../dtos/user/CreateUser.dto.ts";
import UserService from "../../services/user/User.service.ts";
import { RequestError } from "../../errors/http/Request.error.ts";
import { NoDataFoundError } from "../../errors/mvc/NoDataFound.error.ts";
import { UpdateUserDto } from "../../dtos/user/UpdateUser.dto.ts";
import { UserResponseDto } from "../../dtos/user/UserResponse.dto.ts";
import { AbstractApiError } from "../../errors/AbstractApi.error.ts";

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

            return res.status(200).send(resUserDto);
        } catch (e: any) {
            if (e instanceof AbstractApiError) {
                console.error(e.$consoleLog);
                return res.status(e.$statusCode).send(e.$message);
            } else {
                console.error(e);
                return res.status(500).send(e.message);
            }
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

                return res.status(200).send(userRes);
            }
        } catch (e: any) {
            if (e instanceof AbstractApiError) {
                console.error(e.$consoleLog);
                return res.status(e.$statusCode).send(e.$message);
            } else {
                console.error(e);
                return res.status(500).send(e.message);
            }
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

            return res.status(200).send(resUserDto);
        } catch (e: any) {
            if (e instanceof AbstractApiError) {
                console.error(e.$consoleLog);
                return res.status(e.$statusCode).send(e.$message);
            } else {
                console.error(e);
                return res.status(500).send(e.message);
            }
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

            return res.status(200).send({
                message: "Conta desativada com sucesso."
            });
        } catch (e: any) {
            if (e instanceof AbstractApiError) {
                console.error(e.$consoleLog);
                return res.status(e.$statusCode).send(e.$message);
            } else {
                console.error(e);
                return res.status(500).send(e.message);
            }
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

            return res.status(200).send({
                message: "Conta desativada com sucesso."
            });
        } catch (e: any) {
            if (e instanceof AbstractApiError) {
                console.error(e.$consoleLog);
                return res.status(e.$statusCode).send(e.$message);
            } else {
                console.error(e);
                return res.status(500).send(e.message);
            }
        }
    }
}