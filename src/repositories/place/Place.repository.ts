import { SheetsDbContext } from "../../connection/database/SheetsDbContext";
import { SheetsSeq } from "../../enums/sheets/SheetsSeq.enum";
import Place from "../../models/place/Place.ts"
import { CreatePlaceDto } from "../../dtos/place/CreatePlace.dto.ts"
import { GetPlaceDto } from "../../dtos/place/GetPlace.dto.ts"
import { UpdatePlaceDto } from "../../dtos/place/UpdatePlace.dto.ts"
import { GetUserDto } from "../../dtos/user/GetUser.dto.ts";

export class PlaceRepository {
    private static instance : PlaceRepository;

    public static GetInstance() : PlaceRepository {
        if (!this.instance) {
            this.instance = new PlaceRepository();
        }

        return this.instance;
    }

    private async GetNextId() : Promise<Number> {
        try {
            const response = await SheetsDbContext.get(SheetsSeq.PlaceSequence);

            if (!response || !response.data.values)
                throw new Error('Valor da sequence não foi retornado pelo banco de dados.')

            const currId = Number(response.data.values[0][0]);

            await SheetsDbContext.update([[currId + 1]], SheetsSeq.PlaceSequence);

            return Number(currId);
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    public async Create(place: CreatePlaceDto) : Promise<Place> {
        try {
            const id = await this.GetNextId();

            await SheetsDbContext.append(
                [[id, place.$name, place.$user_id]],
                'Places!A:C'
            )

            return new Place(id, place.$name, place.$user_id)
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    public async GetAll() : Promise<GetPlaceDto[]> {
        try {
            const response = await SheetsDbContext.get('Places!A:C')
            const values = response.data.values;

            if (!values || values.length < 1) return [];
            values.shift();

            const placesArray = new Array();
            values.forEach(x => {
                placesArray.push(new GetPlaceDto(
                    x[0],
                    x[1],
                    Number(x[2])
                ))
            })

            return placesArray;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    public async GetById(id: Number) : Promise<GetPlaceDto | undefined> {
        try {
            const response = await SheetsDbContext.getByMatch(id, 'Places', 'A', 'A', 'C')

            if (!response || !response.data.values)
                return undefined;

            const placeDt = response.data.values[0];

            const usrRes = await SheetsDbContext.getByMatch(placeDt[2],'Users','A','A','D');

            if (!usrRes || !usrRes.data.values)
                throw new Error(`Um usuário com ID ${placeDt[2]} cadastrado no local não foi encontrado.`)

            const usrData = usrRes.data.values[0];

            return new GetPlaceDto(
                placeDt[0],
                placeDt[1],
                new GetUserDto(
                    usrData[0],
                    usrData[1],
                    usrData[2],
                    usrData[3]
                )
            )
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    
    public async Update(place: UpdatePlaceDto) : Promise<Place> {
        try {
            const responseGet = await SheetsDbContext.getByMatch(place.$id, 'Places', 'A', 'A', 'C');

            if (!responseGet || !responseGet.data.values)
                throw new Error(`Nenhum local cadastrado com o ID ${place.$id} não foi encontrado.`);

            await SheetsDbContext.update(
                [[place.$id, place.$name, place.$user_id]],
                responseGet.data.range!
            );

            return new Place(place.$id, place.$name!, place.$user_id!);
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}