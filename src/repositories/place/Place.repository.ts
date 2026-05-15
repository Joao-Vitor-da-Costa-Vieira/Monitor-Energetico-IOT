import { SheetsDbContext } from "../../connection/database/SheetsDbContext.ts";
import { SheetsSeq } from "../../enums/sheets/SheetsSeq.enum.ts";
import Place from "../../models/place/Place.ts";
import { PlaceTableStruct as TableStruct } from "../../enums/tableStructure/PlaceTableStruct.enum.ts";
import { CreatePlaceDto } from "../../dtos/place/CreatePlace.dto.ts";
import { UpdatePlaceDto } from "../../dtos/place/UpdatePlace.dto.ts";
import { SheetTypeMapper } from "../../utils/sheets/SheetTypes.mapper.ts";

export class PlaceRepository {
    private static instance : PlaceRepository;

    public static GetInstance() : PlaceRepository {
        if (!this.instance) {
            this.instance = new PlaceRepository();
        }

        return this.instance;
    }

    private async GetNextId() : Promise<number> {
        try {
            const response = await SheetsDbContext.get(SheetsSeq.PlaceSequence);

            if (!response || !response.data.values)
                throw new Error('Valor da sequence não foi retornado pelo banco de dados.')

            const currId = Number(response.data.values[0][0]);

            await SheetsDbContext.update([[currId + 1]], SheetsSeq.PlaceSequence);

            return Number(currId);
        } catch (e) {
            throw e;
        }
    }

    public async Create(place: CreatePlaceDto) : Promise<Place> {
        try {
            const id = await this.GetNextId();

            await SheetsDbContext.append(
                [[id, place.$name, place.$user_id, true]],
                `${TableStruct.Page}!${TableStruct.ColRange}`
            )

            return new Place(id, place.$name, place.$user_id, true)
        } catch (e) {
            throw e;
        }
    }

    public async GetAll() : Promise<Place[]> {
        try {
            const response = await SheetsDbContext.get(`${TableStruct.Page}!${TableStruct.ColRange}`)
            const values = response.data.values;

            if (!values || values.length < 1) return [];
            values.shift();

            const placesArray = new Array();
            values.forEach((x: Array<any>) => {
                placesArray.push(new Place(
                    x[0],
                    x[1],
                    Number(x[2]),
                    SheetTypeMapper.convertSheetBool(x[3])
                ))
            })

            return placesArray;
        } catch (e) {
            throw e;
        }
    }

    public async GetById(id: number) : Promise<Place | undefined> {
        try {
            const response = await SheetsDbContext.getByMatch(id, TableStruct.Page, TableStruct.Id, TableStruct.FirstCol, TableStruct.LastCol)

            if (!response || !response.data.values)
                return undefined;

            const placeDt = response.data.values[0];

            return new Place(
                placeDt[0],
                placeDt[1],
                Number(placeDt[2]),
                SheetTypeMapper.convertSheetBool(placeDt[3])
            )
        } catch (e) {
            throw e;
        }
    }

    
    public async Update(place: UpdatePlaceDto) : Promise<Place> {
        try {
            const responseGet = await SheetsDbContext.getByMatch(place.$id, TableStruct.Page, TableStruct.Id, TableStruct.FirstCol, TableStruct.LastCol);

            if (!responseGet || !responseGet.data.values)
                throw new Error(`Nenhum local cadastrado com o ID ${place.$id} não foi encontrado.`);

            await SheetsDbContext.update(
                [[place.$id, place.$name, place.$user_id, place.$active]],
                responseGet.data.range!
            );

            return new Place(
                place.$id, 
                place.$name!, 
                place.$user_id!, 
                place.$active!
            );
        } catch (e) {
            throw e;
        }
    }
}