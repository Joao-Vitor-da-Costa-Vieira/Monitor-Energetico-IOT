import { CreatePlaceDto } from "../../dtos/place/CreatePlace.dto";
import { GetPlaceDto } from "../../dtos/place/GetPlace.dto.ts";
import { UpdatePlaceDto } from "../../dtos/place/UpdatePlace.dto";
import { GetUserDto } from "../../dtos/user/GetUser.dto.ts";
import { PlaceRepository } from "../../repositories/place/Place.repository";
import UserService from "../../repositories/user/User.repository.ts";

class PlaceService {
    private static instance : PlaceService;
    private placeRepo : PlaceRepository;
    private userServ : UserService;

    private constructor() {
        this.placeRepo = PlaceRepository.GetInstance();
        this.userServ = UserService.GetInstance();
    }

    public static GetInstance() : PlaceService {
        if (!this.instance) {
            this.instance = new PlaceService();
        }

        return this.instance;
    }

    public async Create(placeData : CreatePlaceDto) : Promise<GetPlaceDto> {
        try {
            const user = await this.userServ.GetById(placeData.$user_id);
            if (!user)
                throw new Error(`Nenhum usuário com ID ${placeData.$user_id} foi encontrado.`)

            const newPlace = await this.placeRepo.Create(placeData);

            newPlace.$user = user

            return new GetPlaceDto(newPlace);
        } catch (e) {
            throw e;
        }
    }

    public async GetAll() : Promise<GetPlaceDto[]> {
        try {
            const placeModelList = await this.placeRepo.GetAll();

            const placeDtoList = new Array();

            placeModelList.forEach((x) => {
                placeDtoList.push(new GetPlaceDto(x));
            })

            return placeDtoList;
        } catch (e) {
            throw e;
        }
    }

    public async GetAllActive() : Promise<GetPlaceDto[]> {
        try {
            const placeModelList = await this.placeRepo.GetAll();

            const placeDtoList = new Array();

            placeModelList.forEach((x) => {
                if (x.$active)
                    placeDtoList.push(new GetPlaceDto(x));
            })

            return placeDtoList;
        } catch (e) {
            throw e;
        }
    }

    public async GetAllByUserId(id: number) : Promise<GetPlaceDto[]> {
        try {
            const placeModelList = await this.placeRepo.GetAll();

            const placeDtoList = new Array();

            placeModelList.forEach((x) => {
                if (x.$usr_id == id)
                    placeDtoList.push(new GetPlaceDto(x));
            })

            return placeDtoList;
        } catch (e) {
            throw e;
        }
    }

    public async GetById(id: number) : Promise<GetPlaceDto | undefined> {
        try {
            const place = await this.placeRepo.GetById(id);

            if (!place)
                return undefined;

            const user = await this.userServ.GetById(place.$usr_id);
            if (!user)
                throw new Error(`Nenhum usuário com ID ${place.$usr_id} foi encontrado.`)
            
            place.$user = user;

            return new GetPlaceDto(place);
        } catch (e) {
            throw e;
        }
    }

    public async Update(placeUpdData: UpdatePlaceDto) : Promise<GetPlaceDto> {
        try {
            const currPlaceData = await this.placeRepo.GetById(placeUpdData.$id);
            let user;

            if (!currPlaceData)
                throw new Error(`Nenhum local com ID ${placeUpdData.$id} foi encontrado para atualizar.`)

            if (!placeUpdData.$name)
                placeUpdData.$name = currPlaceData.$name;
            
            if (placeUpdData.$active === undefined)
                placeUpdData.$active = currPlaceData.$active;

            if (!placeUpdData.$user_id) {
                placeUpdData.$user_id = currPlaceData.$usr_id;
            }

            user = await this.userServ.GetById(placeUpdData.$id);
            if (!user)
                throw new Error(`Nenhum usuário com ID ${placeUpdData.$id} foi encontrado.`)

            const placeUpdated = await this.placeRepo.Update(placeUpdData);
            placeUpdated.$user = user;

            return new GetPlaceDto(placeUpdated);
        } catch (e) {
            throw e;
        }
    }

    public async Activate(id: number) : Promise<void> {
        try {
            const placeUpd = new UpdatePlaceDto(
                id,
                undefined,
                undefined,
                true
            )

            await this.Update(placeUpd);
        } catch (e) {
            throw e;
        }
    }

    public async Deactivate(id: number) : Promise<void> {
        try {
            const placeUpd = new UpdatePlaceDto(
                id,
                undefined,
                undefined,
                false
            )

            await this.Update(placeUpd);
        } catch (e) {
            throw e;
        }
    }
}

export default PlaceService;