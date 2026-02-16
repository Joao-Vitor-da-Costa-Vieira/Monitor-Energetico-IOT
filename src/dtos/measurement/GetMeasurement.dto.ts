import Measurement from "../../models/measurement/Measurement.ts";
import { GetUserDto } from "../user/GetUser.dto.ts";
import User from "../../models/user/User.ts";
import { GetPlaceDto } from "../place/GetPlace.dto.ts"
import Place from "../../models/place/Place.ts";

export class GetMeasurementDto {
    private id : bigint;
    private date : Date;
    private current : Number;
    private power : Number;
    private user : GetUserDto;
    private place? : GetPlaceDto;

    /**
     * 
     * @param {bigint} $id 
     * @param {Date} $date 
     * @param {Number} $current 
     * @param {Number} $power 
     * @param {GetUserDto | User} $user 
     */
	constructor(
        $id: bigint,
        $date: Date,
        $current: Number,
        $power: Number,
        $user: GetUserDto | User
    );

    /**
     * 
     * @param {bigint} $id 
     * @param {Date} $date 
     * @param {Number} $current 
     * @param {Number} $power 
     * @param {GetUserDto | User} $user 
     * @param {GetPlaceDto | Place } $place
     */
	constructor(
        $id: bigint,
        $date: Date,
        $current: Number,
        $power: Number,
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
        $idOrObj: bigint | Measurement,
        $date?: Date,
        $current?: Number,
        $power?: Number,
        $user?: GetUserDto | User,
        $place?: GetPlaceDto | Place
    ) {
        if ($idOrObj instanceof Measurement) {
            this.id = $idOrObj.$id;
            this.date = $idOrObj.$date;
            this.current = $idOrObj.$current;
            this.power = $idOrObj.$power;
            this.user = new GetUserDto($idOrObj.$user!);
            this.place = $idOrObj.$place ? new GetPlaceDto($idOrObj.$place) : undefined;
            return;
        }

        this.id = $idOrObj;
        this.date = $date!;
        this.current = $current!;
        this.power = $power!;
        
        if ($user instanceof GetUserDto) {
            this.user = $user;
        } else {
            this.user = new GetUserDto($user!);
        }

        if ($place instanceof GetPlaceDto) {
            this.place = $place;
        } else if ($place instanceof Place) {
            this.place = new GetPlaceDto($place);
        }
    }

    /**
     * Getter $id
     * @return {bigint}
     */
	public get $id(): bigint {
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
     * @return {Number}
     */
	public get $current(): Number {
		return this.current;
	}

    /**
     * Getter $power
     * @return {Number}
     */
	public get $power(): Number {
		return this.power;
	}

    /**
     * Getter $user
     * @return {GetUserDto}
     */
	public get $user(): GetUserDto {
		return this.user;
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
     * @param {bigint} value
     */
	public set $id(value: bigint) {
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
     * @param {Number} value
     */
	public set $current(value: Number) {
		this.current = value;
	}

    /**
     * Setter $power
     * @param {Number} value
     */
	public set $power(value: Number) {
		this.power = value;
	}

    /**
     * Setter $user
     * @param {GetUserDto} value
     */
	public set $user(value: GetUserDto) {
		this.user = value;
	}
    
    /**
     * Setter $place
     * @param {GetPlaceDto} value
     */
    public set $place(value: GetPlaceDto) {
        this.place = value
    }
}