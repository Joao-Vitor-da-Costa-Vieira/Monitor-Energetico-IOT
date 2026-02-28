import Place from "../place/Place.ts";
import User from "../user/User.ts";

class Measurement {
    private id : Number;
    private date : Date;
    private current : Number;
    private power : Number;
    private usr_id : Number;
    private plc_id? : Number;

    private user? : User;
    private place? : Place;

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
     * @param {User} $user 
     */
    constructor(
        $id: Number, 
        $date: Date, 
        $current: Number, 
        $power: Number, 
        $user: User
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
     * @param {User} $user 
     * @param {Place} $place 
     */
    constructor(
        $id: Number, 
        $date: Date, 
        $current: Number, 
        $power: Number, 
        $user: User, 
        $place: Place
    );

    // TODO: constructor DTO

    constructor(
        $id_obj: Number, 
        $date?: Date, 
        $current?: Number, 
        $power?: Number, 
        $user?: User | Number, 
        $place?: Place | Number
    ) {
        //TODO: constructor DTO

        this.id = $id_obj;
        this.date = $date!;
        this.current = $current!;
        this.power = $power!;

        if (typeof $user == 'number') {
            this.usr_id = $user;
        } else {
            this.user = $user as User;
            this.usr_id = ($user as User).$id;
        }

        if (typeof $place == 'number') {
            this.plc_id = $place;
        } else if ($place instanceof Place) {
            this.place = $place;
            this.plc_id = $place.$id;
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
     * Getter $plc_id
     * @return {Number | undefined}
     */
	public get $plc_id(): Number | undefined {
		return this.plc_id;
	}

    /**
     * Getter $usr_id
     * @return {Number}
     */
	public get $usr_id(): Number {
		return this.usr_id;
	}

    /**
     * Getter $user
     * @return {User | undefined}
     */
    public get $user(): User | undefined {
        return this.user;
    }

    /**
     * Getter $place
     * @return {Place | undefined}
     */
    public get $place(): Place | undefined {
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
     * Setter $plc_id
     * @param {Number} value
     */
	public set $plc_id(value: Number) {
		this.plc_id = value;
	}

    /**
     * Setter $usr_id
     * @param {Number} value
     */
	public set $usr_id(value: Number) {
		this.usr_id = value;
	}

    /**
     * Setter $user
     * @param {User} value
     */
    public set $user(value: User) {
        this.user = value;
        this.usr_id = value.$id;
    }

    /**
     * Setter $place
     * @param {Place} value
     */
    public set $place(value: Place) {
        this.place = value;
        this.plc_id = value.$id;
    }
    
}

export default Measurement;