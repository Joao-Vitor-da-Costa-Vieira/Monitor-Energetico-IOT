import UserRepository from '../../repositories/user/User.repository.ts';
import { GetUserDto } from '../../dtos/user/GetUser.dto.ts';
import { CreateUserDto } from '../../dtos/user/CreateUser.dto.ts';
import { UpdateUserDto } from '../../dtos/user/UpdateUser.dto.ts';
import { PasswordUtils } from '../../utils/user/Password.utils.ts';

class UserService {
    private static instance : UserService;
    private userRepo : UserRepository;

    private constructor() {
        this.userRepo = UserRepository.GetInstance();
    }

    public static GetInstance() : UserService {
        if (!this.instance) {
            this.instance = new UserService();
        }

        return this.instance;
    }

    public async Create(userData: CreateUserDto) : Promise<GetUserDto> {
        try {
            const passErrors = PasswordUtils.verifyPassword(userData.$pass)

            if (passErrors.length > 0) {
                let errorMessages = "";

                passErrors.forEach((x) => {
                    errorMessages += `\n${x};`;
                })

                throw new Error(`Senha inserida é inválida. Ela contém os seguinte(s) erro(s): ${errorMessages}`)
            }

            const newUser = await this.userRepo.Create(userData);

            return new GetUserDto(newUser);
        } catch (e) {
            throw e;
        }
    }

    public async GetAll() : Promise<GetUserDto[]> {
        try {
            const userModelList = await this.userRepo.GetAll();

            const userDtoList = new Array();

            userModelList.forEach((x) => {
                userDtoList.push(new GetUserDto(x));
            })

            return userDtoList;
        } catch (e) {
            throw e;
        }
    }

    public async GetAllActive() : Promise<GetUserDto[]> {
        try {
            const userModelList = await this.userRepo.GetAll();

            const userDtoList = new Array();

            userModelList.forEach((x) => {
                if (x.$active)
                    userDtoList.push(new GetUserDto(x));
            })

            return userDtoList;
        } catch (e) {
            throw e;
        }
    }

    public async GetById(id: number) : Promise<GetUserDto | undefined> {
        try {
            const user = await this.userRepo.GetById(id);

            if (!user)
                return undefined
            else
                return new GetUserDto(user);
        } catch (e) {
            throw e;
        }
    }

    public async Update(userUpdData: UpdateUserDto) : Promise<GetUserDto> {
        try {
            const currUserData = await this.userRepo.GetById(userUpdData.$id);

            if (!currUserData)
                throw new Error(`Nenhum usuário com ID ${userUpdData.$id} foi encontrado para atualizar.`);

            if (!userUpdData.$name) 
                userUpdData.$name = currUserData.$name;
           
            if (!userUpdData.$email) 
                userUpdData.$email = currUserData.$email;
            
            if (!userUpdData.$pass) 
                userUpdData.$pass = currUserData.$pass;
            else {
                PasswordUtils.verifyPassword(userUpdData.$pass)

                const passErrors = PasswordUtils.verifyPassword(userUpdData.$pass)

                if (passErrors.length > 0) {
                    let errorMessages = "";

                    passErrors.forEach((x) => {
                        errorMessages += `\n${x};`;
                    })

                    throw new Error(`Senha nova inserida é inválida. Ela contém os seguinte(s) erro(s): ${errorMessages}`)
                }
            }
            
            if (userUpdData.$active === undefined) 
                userUpdData.$active = currUserData.$active;

            const userUpdated = await this.userRepo.Update(userUpdData);

            return new GetUserDto(userUpdated);
        } catch (e) {
            throw e;
        }
    }

    public async Activate(id: number) : Promise<void> {
        try {
            const userUpd = new UpdateUserDto(
                id,
                undefined,
                undefined,
                undefined,
                true
            );

            await this.Update(userUpd);
        } catch (e) {
            throw e;
        }
    }

    public async Deactivate(id: number) : Promise<void> {
        try {
            const userUpd = new UpdateUserDto(
                id,
                undefined,
                undefined,
                undefined,
                false
            );

            await this.Update(userUpd);
        } catch (e) {
            throw e;
        }
    }
}

export default UserService;