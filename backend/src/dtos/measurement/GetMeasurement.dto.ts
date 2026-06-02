import Measurement from "../../models/measurement/Measurement.ts";
import { GetUserDto } from "../user/GetUser.dto.ts";
import User from "../../models/user/User.ts";
import { GetPlaceDto } from "../place/GetPlace.dto.ts"
import Place from "../../models/place/Place.ts";

export class GetMeasurementDto {
    private id : number;
    private date : Date;
    private current : number;
    private power : number;
    private usr_id? : number;
    private user? : GetUserDto;
    private plc_id ? : number;
    private place? : GetPlaceDto;

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

    constructor(
        $idOrObj: number | Measurement,
        $date?: Date,
        $current?: number,
        $power?: number,
        $user?: GetUserDto | User | number,
        $place?: GetPlaceDto | Place | number
    ) {
        if ($idOrObj instanceof Measurement) {
            this.id = Number($idOrObj.$id);
            this.date = $idOrObj.$date;
            this.current = $idOrObj.$current;
            this.power = $idOrObj.$power;
            this.usr_id = $idOrObj.$user ? Number($idOrObj.$user.$id) : Number($idOrObj.$usr_id);
            this.plc_id = $idOrObj.$place ? Number($idOrObj.$place.$id) : Number($idOrObj.$plc_id);
            this.user = $idOrObj.$user ? new GetUserDto($idOrObj.$user) : undefined;
            this.place = $idOrObj.$place ? new GetPlaceDto($idOrObj.$place) : undefined;
            return;
        }

        this.id = $idOrObj;
        this.date = $date!;
        this.current = $current!;
        this.power = $power!;
        
        if ($user instanceof GetUserDto) {
            this.user = $user;
            this.usr_id = $user.$id;
        } else if ($user instanceof User) {
            this.user = new GetUserDto($user);
            this.usr_id = this.user.$id;
        } else if (typeof $user == 'number') {
            this.usr_id = $user;
        }

        if ($place instanceof GetPlaceDto) {
            this.place = $place;
            this.plc_id = $place.$id;
        } else if ($place instanceof Place) {
            this.place = new GetPlaceDto($place);
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
     * @return {GetUserDto | undefined}
     */
	public get $user(): GetUserDto | undefined {
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
     * @returns {GetPlaceDto | undefined}
     */
    public get $place(): GetPlaceDto | undefined {
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
     * @param {GetUserDto | User} value
     */
	public set $user(value: GetUserDto | User) {
        if (value instanceof GetUserDto) {
		    this.user = value;
        } else {
            this.user = new GetUserDto(value);
        }
        
        this.usr_id = Number(this.user.$id);
	}
    
    /**
     * Setter $place
     * @param {GetPlaceDto | Place} value
     */
    public set $place(value: GetPlaceDto | Place) {
        if (value instanceof GetPlaceDto) {
            this.place = value;
        } else {
            this.place = new GetPlaceDto(value);
        }
        
        this.plc_id = Number(this.place.$id);
    }
}