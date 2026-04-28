import { CreateMeasurementDto } from '../../dtos/measurement/CreateMeasurement.dto.ts';
import { GetMeasurementDto } from '../../dtos/measurement/GetMeasurement.dto.ts';
import { UpdateMeasurementDto } from '../../dtos/measurement/UpdateMeasurement.dto.ts';
import { RequestError } from '../../errors/http/Request.error.ts';
import { BussinessRuleError } from '../../errors/mvc/BussinessRule.error.ts';
import { NoDataFoundError } from '../../errors/mvc/NoDataFound.error.ts';
import { MeasurementRepository } from '../../repositories/measurement/Measurement.repository.ts';
import PlaceService from '../../services/place/Place.service.ts';
import UserService from '../../services/user/User.service.ts';

class MeasurementService {
    private static instance : MeasurementService;
    private measureRepo : MeasurementRepository;
    private placeServ : PlaceService;
    private userServ : UserService;
    

    private constructor() {
        this.measureRepo = MeasurementRepository.GetInstance();
        this.placeServ = PlaceService.GetInstance();
        this.userServ = UserService.GetInstance();
    }

    public static GetInstance() : MeasurementService {
        if (!this.instance) {
            this.instance = new MeasurementService();
        }

        return this.instance;
    }

    public async Create(measure: CreateMeasurementDto) : Promise<GetMeasurementDto> {
        try {
            if (!Number.isFinite(measure.$current)) {
                throw new RequestError(400, "Corrente precisa ser um valor numérico.")
            }

            if (!Number.isFinite(measure.$power)) {
                throw new RequestError(400, "Energia precisa ser um valor numérico.")
            }

            const user = await this.userServ.GetById(measure.$usr_id);
            let place;

            if (!user)
                throw new NoDataFoundError(404, `Nenhum usuário com ID ${measure.$usr_id} foi encontrado.`);

            if (measure.$plc_id) {
                place = await this.placeServ.GetById(measure.$plc_id);

                if (!place)
                    throw new NoDataFoundError(404, `Nenhum local com ID ${measure.$plc_id} foi encontrado.`);

                if (place.$usr_id != measure.$usr_id)
                    throw new BussinessRuleError(400, `O local "${place.$name}" não está registrado na conta do usuário ${user.$name}.`)
            }

            const newMeasure = new GetMeasurementDto(await this.measureRepo.Create(measure));

            newMeasure.$user = user;
            if (place)
                newMeasure.$place = place;

            return newMeasure;
        } catch (e) {
            throw e;
        }
    }

    public async GetAll() : Promise<GetMeasurementDto[]> {
        try {
            const measureList = await this.measureRepo.GetAll();

            const measureDtoList = new Array();

            measureList.forEach((x) => {
                measureDtoList.push(new GetMeasurementDto(x));
            })

            return measureDtoList;
        } catch (e) {
            throw e;
        }
    }

    public async GetAllByUserId(id: number) : Promise<GetMeasurementDto[]> {
        try {
            const measureList = await this.measureRepo.GetAll();

            const measureDtoList = new Array();

            measureList.forEach((x) => {
                if (x.$usr_id === id)
                    measureDtoList.push(new GetMeasurementDto(x));
            })

            return measureDtoList;
        } catch (e) {
            throw e;
        }
    }

    public async GetAllByPlaceId(id: number) : Promise<GetMeasurementDto[]> {
        try {
            const measureList = await this.measureRepo.GetAll();

            const measureDtoList = new Array();

            measureList.forEach((x) => {
                if (x.$plc_id && x.$plc_id == id)
                    measureDtoList.push(new GetMeasurementDto(x));
            })

            return measureDtoList;
        } catch (e) {
            throw e;
        }
    }

    public async GetById(id: number) : Promise<GetMeasurementDto | undefined> {
        try {
            const measure = await this.measureRepo.GetById(id);

            if (!measure)
                return undefined;

            const measureDto = new GetMeasurementDto(measure);

            let user;
            let place;

            if (!measureDto.$plc_id) {
                user = await this.userServ.GetById(measure.$usr_id)

                if (!user)
                    throw new NoDataFoundError(404, `Nenhum usuário com ID ${measure.$usr_id} foi encontrado.`);

                measureDto.$user = user;
            } else {
                place = await this.placeServ.GetById(measureDto.$plc_id);

                if (!place)
                    throw new NoDataFoundError(404, `Nenhum local com ID ${measureDto.$plc_id} foi encontrado.`);

                measureDto.$place = place;
                measureDto.$user = place.$user!;
            }

            return measureDto;
        } catch (e) {
            throw e;
        }
    }

    public async Update(measureUpdData: UpdateMeasurementDto) : Promise<GetMeasurementDto> {
        try {
            const currMeasureDto = await this.measureRepo.GetById(measureUpdData.$id);
            let place;
            let user;

            if (!currMeasureDto)
                throw new NoDataFoundError(404, `Nenhuma medição com ID ${measureUpdData.$id} foi encontrada para atualizar`);

            if (!measureUpdData.$power)
                measureUpdData.$power = currMeasureDto.$power;

            if (!measureUpdData.$current)
                measureUpdData.$current = currMeasureDto.$current;

            if (!measureUpdData.$plc_id && currMeasureDto.$plc_id)
                measureUpdData.$plc_id = currMeasureDto.$plc_id;

            if (!measureUpdData.$usr_id)
                measureUpdData.$usr_id = currMeasureDto.$usr_id;

            if (!measureUpdData.$plc_id) {
                user = await this.userServ.GetById(measureUpdData.$usr_id);

                if (!user)
                    throw new NoDataFoundError(404, `Nenhum usuário com ID ${measureUpdData.$usr_id} foi encontrado.`);
            } else {
                place = await this.placeServ.GetById(measureUpdData.$plc_id);

                if (!place)
                    throw new NoDataFoundError(404, `Nenhum local com ID ${measureUpdData.$plc_id} foi encontrado.`);

                if (place.$usr_id != measureUpdData.$usr_id)
                    throw new BussinessRuleError(400, `O local "${place.$name}" não está registrado na conta do usuário com ID ${measureUpdData.$usr_id}.`)

                user = place.$user;
            }

            const newMeasure = new GetMeasurementDto(await this.measureRepo.Update(measureUpdData));
            newMeasure.$user = user!;
            if (place) newMeasure.$place = place;

            return newMeasure;
        } catch (e) {
            throw e;
        }
    }

    public async Delete(id: number) {
        try {
            this.measureRepo.Delete(id);
        } catch (e) {
            throw e;
        }
    }
}

export default MeasurementService;