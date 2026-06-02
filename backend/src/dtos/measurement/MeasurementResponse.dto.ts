import Measurement from "../../models/measurement/Measurement.ts";
import { GetUserDto } from "../user/GetUser.dto.ts";
import User from "../../models/user/User.ts";
import { GetPlaceDto } from "../place/GetPlace.dto.ts"
import Place from "../../models/place/Place.ts";
import { UserResponseDto } from "../user/UserResponse.dto.ts";
import { PlaceResponseDto } from "../place/PlaceResponse.dto.ts";
import { GetMeasurementDto } from "./GetMeasurement.dto.ts";

export class MeasurementResponseDto {
    private id : number;
    private date : Date;
    private current : number;
    private power : number;
    private usr_id? : number;
    private user? : UserResponseDto;
    private plc_id ? : number;
    private place? : PlaceResponseDto;

    /**
     * 
     * @param {number} $id 
     * @param {Date} $date 
     * @param {number} $current 
     * @param {number} $power
     */
	constructor(
        $id: number,
        $date: Date,
        $current: number,
        $power: number
    );

    /**
     * 
     * @param {number} $id 
     * @param {Date} $date 
     * @param {number} $current 
     * @param {number} $power 
     * @param {number} $usr_id 
     */
    constructor(
        $id: number,
        $date: Date,
        $current: number,
        $power: number,
        $usr_id: number
    );

    /**
     * 
     * @param {number} $id 
     * @param {Date} $date 
     * @param {number} $current 
     * @param {number} $power 
     * @param {GetUserDto | User} $user 
     */
	constructor(
        $id: number,
        $date: Date,
        $current: number,
        $power: number,
        $user: GetUserDto | User
    );

    /**
     * 
     * @param {number} $id 
     * @param {Date} $date 
     * @param {number} $current 
     * @param {number} $power 
     * @param {number} $usr_id 
     * @param {number} $plc_id
     */
    constructor(
        $id: number,
        $date: Date,
        $current: number,
        $power: number,
        $usr_id: number,
        $plc_id: number
    );

    /**
     * 
     * @param {number} $id 
     * @param {Date} $date 
     * @param {number} $current 
     * @param {number} $power 
     * @param {GetUserDto | User} $user 
     * @param {GetPlaceDto | Place } $place
     */
	constructor(
        $id: number,
        $date: Date,
        $current: number,
        $power: number,
        $user: GetUserDto | User,
        $place: GetPlaceDto | Place
    );

    /**
     * 
     * @param {Measurement} $measurement 
     */
    constructor(
        $measurement: Measurement
    )

    /**
     * 
     * @param {GetMeasurementDto} $measurement 
     */
    constructor(
        $measurement: GetMeasurementDto
    )

    constructor(
        $idOrObjorDto: number | Measurement | GetMeasurementDto,
        $date?: Date,
        $current?: number,
        $power?: number,
        $user?: GetUserDto | User | number,
        $place?: GetPlaceDto | Place | number
    ) {
        if ($idOrObjorDto instanceof Measurement) {
            this.id = $idOrObjorDto.$id;
            this.date = $idOrObjorDto.$date;
            this.current = $idOrObjorDto.$current;
            this.power = $idOrObjorDto.$power;
            this.usr_id = $idOrObjorDto.$user ? $idOrObjorDto.$user.$id : $idOrObjorDto.$usr_id;
            this.plc_id = $idOrObjorDto.$place ? $idOrObjorDto.$place.$id : $idOrObjorDto.$plc_id;
            this.user = $idOrObjorDto.$user ? new UserResponseDto($idOrObjorDto.$user) : undefined;
            this.place = $idOrObjorDto.$place ? new PlaceResponseDto($idOrObjorDto.$place) : undefined;
            return;
        }

        if ($idOrObjorDto instanceof GetMeasurementDto) {
            this.id = $idOrObjorDto.$id;
            this.date = $idOrObjorDto.$date;
            this.current = $idOrObjorDto.$current;
            this.power = $idOrObjorDto.$power;
            this.usr_id = $idOrObjorDto.$usr_id;
            this.plc_id = $idOrObjorDto.$plc_id;
            this.user = $idOrObjorDto.$user ? new UserResponseDto($idOrObjorDto.$user) : undefined;
            this.place = $idOrObjorDto.$place ? new PlaceResponseDto($idOrObjorDto.$place) : undefined;
            return;
        }

        this.id = $idOrObjorDto;
        this.date = $date!;
        this.current = $current!;
        this.power = $power!;
        
        if ($user instanceof GetUserDto) {
            this.user = new UserResponseDto($user);
            this.usr_id = $user.$id;
        } else if ($user instanceof User) {
            this.user = new UserResponseDto($user);
            this.usr_id = this.user.$id;
        } else if (typeof $user == 'number') {
            this.usr_id = $user;
        }

        if ($place instanceof GetPlaceDto) {
            this.place = new PlaceResponseDto($place);
            this.plc_id = $place.$id;
        } else if ($place instanceof Place) {
            this.place = new PlaceResponseDto($place);
            this.plc_id = this.place.$id;
        } else if (typeof $place == 'number') {
            this.plc_id = $place;
        }
    }

    /**
     * Getter $id
     * @return {number}
     */
	public get $id(): number {
		return this.id;
	}

    /**
     * Getter $date
     * @return {Date}
     */
	public get $date(): Date {
		return this.date;
	}

    /**
     * Getter $current
     * @return {number}
     */
	public get $current(): number {
		return this.current;
	}

    /**
     * Getter $power
     * @return {number}
     */
	public get $power(): number {
		return this.power;
	}

    /**
     * Getter $usr_id
     * @returns {number | undefined}
     */
    public get $usr_id(): number | undefined {
        return this.usr_id;
    }

    /**
     * Getter $user
     * @return {UserResponseDto | undefined}
     */
	public get $user(): UserResponseDto | undefined {
		return this.user;
	}

    /**
     * Getter $plc_id
     * @returns {number | undefined}
     */
    public get $plc_id(): number | undefined {
        return this.plc_id;
    }

    /**
     * Getter $place
     * @returns {PlaceResponseDto | undefined}
     */
    public get $place(): PlaceResponseDto | undefined {
        return this.place;
    }

    /**
     * Setter $id
     * @param {number} value
     */
	public set $id(value: number) {
		this.id = value;
	}

    /**
     * Setter $date
     * @param {Date} value
     */
	public set $date(value: Date) {
		this.date = value;
	}

    /**
     * Setter $current
     * @param {number} value
     */
	public set $current(value: number) {
		this.current = value;
	}

    /**
     * Setter $power
     * @param {number} value
     */
	public set $power(value: number) {
		this.power = value;
	}

    /**
     * Setter $user
     * @param {UserResponseDto | GetUserDto | User} value
     */
	public set $user(value: UserResponseDto | GetUserDto | User) {
        if (value instanceof GetUserDto) {
		    this.user = new UserResponseDto(value);
        } else if (value instanceof User) {
            this.user = new UserResponseDto(value);
        } else {
            this.user = value;
        }
        
        this.usr_id = this.user.$id;
	}
    
    /**
     * Setter $place
     * @param {PlaceResponseDto | GetPlaceDto | Place} value
     */
    public set $place(value: PlaceResponseDto | GetPlaceDto | Place) {
        if (value instanceof GetPlaceDto) {
            this.place = new PlaceResponseDto(value);
        } else if (value instanceof Place) {
            this.place = new PlaceResponseDto(value);
        } else {
            this.place = value;
        }
        
        this.plc_id = this.place.$id;
    }
}