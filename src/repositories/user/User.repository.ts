import { SheetsDbContext } from "../../connection/database/SheetsDbContext.ts"
import { CreateUserDto } from "../../dtos/user/CreateUser.dto.ts"
import { UserTableStruct as TableStruct } from "../../enums/tableStructure/UserTableStruct.enum.ts"
import { UpdateUserDto } from "../../dtos/user/UpdateUser.dto.ts"
import { SheetsSeq } from "../../enums/sheets/SheetsSeq.enum.ts"
import User from "../../models/user/User.ts"
import 'dotenv/config'
import { SheetTypeMapper } from "../../utils/sheets/SheetTypes.mapper.ts"

class UserRepository {
    private static instance : UserRepository;

    public static GetInstance() {
        if (!UserRepository.instance) {
            UserRepository.instance = new UserRepository();
        }

        return UserRepository.instance;
    }

    private async GetNextId() : Promise<number> {
        try {
            const resId = await SheetsDbContext.get(SheetsSeq.UserSequence);
            const currId = Number(resId.data.values![0][0]);

            await SheetsDbContext.update([[currId + 1]], SheetsSeq.UserSequence);

            return currId;
        } catch (e) {
            throw e;
        }
    }

    public async Create(user: CreateUserDto) : Promise<User> {
        try {
            const id = await this.GetNextId();

            await SheetsDbContext.append(
                [[id, user.$name, user.$email, user.$pass, true]],
                `${TableStruct.Page}!${TableStruct.ColRange}`
            )

            return new User(id, user.$name, user.$email, user.$pass);
        } catch (e) {
            throw e;
        }
    }

    public async GetAll() : Promise<User[]> {
        try {
            const response = await SheetsDbContext.get(`${TableStruct.Page}!${TableStruct.ColRange}`)
            const values = response.data.values;

            if (!values || values.length < 1) return [];
            values.shift();

            const userArray = new Array();
            values.forEach(x => {
                userArray.push(new User(
                    x[0],
                    x[1],
                    x[2],
                    x[3],
                    SheetTypeMapper.convertSheetBool(x[4])
                ))
            });

            return userArray;
        } catch (e) {
            throw e;
        }
    }

    public async GetById(id: number) : Promise<User | undefined> {
        const response = await SheetsDbContext.getByMatch(id, TableStruct.Page, TableStruct.Id, TableStruct.FirstCol, TableStruct.LastCol);

        if (!response || !response.data.values) {
            return undefined;
        } else {
            const userDt = response.data.values[0];
            return new User(
                userDt[0],
                userDt[1],
                userDt[2],
                userDt[3],
                SheetTypeMapper.convertSheetBool(userDt[4])
            )
        }
    }

    public async GetByEmail(email: string) : Promise<User | undefined> {
        const response = await SheetsDbContext.getByMatch(email, TableStruct.Page, TableStruct.Email, TableStruct.FirstCol, TableStruct.LastCol);

        if (!response || !response.data.values) {
            return undefined;
        } else {
            const userDt = response.data.values[0];
            return new User(
                userDt[0],
                userDt[1],
                userDt[2],
                userDt[3],
                SheetTypeMapper.convertSheetBool(userDt[4])
            )
        }
    }

    public async Update(user: UpdateUserDto) : Promise<User> {
        try {
            const responseGet = await SheetsDbContext.getByMatch(user.$id, TableStruct.Page, TableStruct.Id, TableStruct.FirstCol, TableStruct.LastCol)

            if (!responseGet || !responseGet.data.values)
                throw new Error(`Nenhum usuário com ID ${user.$id} não foi encontrado.`);

            await SheetsDbContext.update(
                [[user.$id, user.$name, user.$email, user.$pass, user.$active]],
                responseGet.data.range!
            )

            return new User(
                user.$id, 
                user.$name!, 
                user.$email!, 
                user.$pass!, 
                user.$active!
            )
        } catch (e) {
            throw e;
        }
    }
}

export default UserRepository;