import { SheetsDbContext } from "../../connection/database/SheetsDbContext";
import { SheetsSeq } from "../../enums/sheets/SheetsSeq.enum";
import { MeasurementTableStruct as TableStruct } from "../../enums/tableStructure/MeasureTableStruct.enum.ts";
import { CreateMeasurementDto } from "../../dtos/measurement/CreateMeasurement.dto.ts";
import { UpdateMeasurementDto } from "../../dtos/measurement/UpdateMeasurement.dto.ts";
import Measurement from "../../models/measurement/Measurement";

export class MeasurementRepository {
    private static instance : MeasurementRepository;

    /**
     * GetInstance
     */
    public static GetInstance() : MeasurementRepository {
        if (!this.instance)
            this.instance = new MeasurementRepository();

        return this.instance;
    }

    private async GetNextId() : Promise<Number> {
        try {
            const response = await SheetsDbContext.get(SheetsSeq.MeasureSequence);

            if (!response || !response.data.values)
                throw new Error('Valor da sequence não foi retornado pelo banco de dados.');

            const currId = Number(response.data.values[0][0]);

            await SheetsDbContext.update([[currId + 1]], SheetsSeq.MeasureSequence);

            return Number(currId);
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
    
    public async Create(measure: CreateMeasurementDto) : Promise<Measurement> {
        try {
            const id = await this.GetNextId();

            await SheetsDbContext.append(
                [[id, new Date(measure.$date), measure.$current, measure.$power, measure.$usr_id, measure.$plc_id]],
                `${TableStruct.Page}!${TableStruct.ColRange}`
            )

            if (!measure.$plc_id) {
                return new Measurement(
                    id, 
                    new Date(measure.$date), 
                    measure.$current, 
                    measure.$power, 
                    measure.$usr_id
                )
            } else {
                return new Measurement(
                    id, 
                    new Date(measure.$date), 
                    measure.$current, 
                    measure.$power, 
                    measure.$usr_id, 
                    measure.$plc_id
                )
            }
        } catch (e) {
            throw e;
        }
    }

    public async GetAll() : Promise<Measurement[]> {
        try {
            const response = await SheetsDbContext.get(`${TableStruct.Page}!${TableStruct.ColRange}`);
            const values = response.data.values;

            if (!values || values.length < 1) return [];

            values.shift();

            const measuresArray = new Array();
            values.forEach((x) => {
                if (x.length < 6) {
                    measuresArray.push(new Measurement(
                        Number(x[0]),
                        new Date(x[1]),
                        Number(x[2]),
                        Number(x[3]),
                        Number(x[4])
                    ))
                } else {
                    measuresArray.push(new Measurement(
                        Number(x[0]),
                        new Date(x[1]),
                        Number(x[2]),
                        Number(x[3]),
                        Number(x[4]),
                        Number(x[5])
                    ))
                }
            })

            return measuresArray;
        } catch (e) {
            throw e;
        }
    }

    public async GetById(id: Number) : Promise<Measurement | undefined> {
        try {
            const response = await SheetsDbContext.getByMatch(id, TableStruct.Page, TableStruct.Id, TableStruct.FirstCol, TableStruct.LastCol);

            if (!response || !response.data.values)
                return undefined;

            const measureDt = response.data.values[0];

            if (measureDt.length < 6) {
                return new Measurement(
                    Number(measureDt[0]),
                    new Date(measureDt[1]),
                    Number(measureDt[2]),
                    Number(measureDt[3]),
                    Number(measureDt[4])
                )
            } else {
                return new Measurement(
                    Number(measureDt[0]),
                    new Date(measureDt[1]),
                    Number(measureDt[2]),
                    Number(measureDt[3]),
                    Number(measureDt[4]),
                    Number(measureDt[5])
                )
            }
        } catch (e) {
            throw e;
        }
    }

    public async Update(measure: UpdateMeasurementDto) : Promise<Measurement> {
        try {
            const responseGet = await SheetsDbContext.getByMatch(measure.$id, TableStruct.Page, TableStruct.Id, TableStruct.FirstCol, TableStruct.LastCol)

            if (!responseGet || !responseGet.data.values)
                throw new Error(`Nenhuma medição cadastrado com o ID ${measure.$id} foi encontrado.`);

            await SheetsDbContext.update(
                [[measure.$id, measure.$date, measure.$current, measure.$power, measure.$usr_id, measure.$plc_id]],
                responseGet.data.range!
            );

            if (!measure.$plc_id) {
                return new Measurement(
                    measure.$id,
                    new Date(measure.$date!),
                    measure.$current!,
                    measure.$power!,
                    measure.$usr_id!
                )
            } else {
                return new Measurement(
                    measure.$id,
                    new Date(measure.$date!),
                    measure.$current!,
                    measure.$power!,
                    measure.$usr_id!,
                    measure.$plc_id
                )
            }
        } catch (e) {
            throw e;
        }
    }
}