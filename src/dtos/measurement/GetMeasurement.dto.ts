import Measurement from "../../models/measurement/Measurement.ts";
import { GetUserDto } from "../user/GetUser.dto.ts";
import User from "../../models/user/User.ts";
import { GetPlaceDto } from "../place/GetPlace.dto.ts"
import Place from "../../models/place/Place.ts";

export class GetMeasurementDto {
    private id : Number;
    private date : Date;
    private current : Number;
    private power : Number;
    private usr_id? : Number;
    private user? : GetUserDto;
    private plc_id ? : Number;
    private place? : GetPlaceDto;

    /**
     * 
     * @param {Number} $id 
     * @param {Date} $date 
     * @param {Number} $current 
     * @param {Number} $power
     */
	constructor(
        $id: Number,
        $date: Date,
        $current: Number,
        $power: Number
    );

    /**
     * 
     * @param {Number} $id 
     * @param {Date} $date 
     * @param {Number} $current 
     * @param {Number} $power 
     * @param {Number} $usr_id 
     */
    constructor(
        $id: Number,
        $date: Date,
        $current: Number,
        $power: Number,
        $usr_id: Number
    );

    /**
     * 
     * @param {Number} $id 
     * @param {Date} $date 
     * @param {Number} $current 
     * @param {Number} $power 
     * @param {GetUserDto | User} $user 
     */
	constructor(
        $id: Number,
        $date: Date,
        $current: Number,
        $power: Number,
        $user: GetUserDto | User
    );

    /**
     * 
     * @param {Number} $id 
     * @param {Date} $date 
     * @param {Number} $current 
     * @param {Number} $power 
     * @param {Number} $usr_id 
     * @param {Number} $plc_id
     */
    constructor(
        $id: Number,
        $date: Date,
        $current: Number,
        $power: Number,
        $usr_id: Number,
        $plc_id: Number
    );

    /**
     * 
     * @param {Number} $id 
     * @param {Date} $date 
     * @param {Number} $current 
     * @param {Number} $power 
     * @param {GetUserDto | User} $user 
     * @param {GetPlaceDto | Place } $place
     */
	constructor(
        $id: Number,
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
        $idOrObj: Number | Measurement,
        $date?: Date,
        $current?: Number,
        $power?: Number,
        $user?: GetUserDto | User | Number,
        $place?: GetPlaceDto | Place | Number
    ) {
        if ($idOrObj instanceof Measurement) {
            this.id = $idOrObj.$id;
            this.date = $idOrObj.$date;
            this.current = $idOrObj.$current;
            this.power = $idOrObj.$power;
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
     * @return {Number}
     */
	public get $id(): Number {
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
     * Getter $usr_id
     * @returns {Number | undefined}
     */
    public get $usr_id(): Number | undefined {
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
     * @returns {Number | undefined}
     */
    public get $plc_id(): Number | undefined {
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
     * @param {Number} value
     */
	public set $id(value: Number) {
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
     * @param {GetUserDto | User} value
     */
	public set $user(value: GetUserDto | User) {
        if (value instanceof GetUserDto) {
		    this.user = value;
            this.usr_id = value.$id;
        } else {
            this.user = new GetUserDto(value);
            this.usr_id = this.user.$id;
        }
	}
    
    /**
     * Setter $place
     * @param {GetPlaceDto | Place} value
     */
    public set $place(value: GetPlaceDto | Place) {
        if (value instanceof GetPlaceDto) {
            this.place = value;
            this.plc_id = value.$id;
        } else {
            this.place = new GetPlaceDto(value);
            this.plc_id = this.place.$id;
        }
    }
}