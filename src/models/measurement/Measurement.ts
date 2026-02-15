import Place from "../place/Place.ts";
import User from "../user/User.ts";

class Measurement {
    private id : bigint;
    private date : Date;
    private current : Number;
    private power : Number;
    private usr_id : bigint;
    private loc_id? : bigint;

    private user? : User;
    private place? : Place;

    /**
     * 
     * @param {bigint} $id 
     * @param {Date} $date 
     * @param {Number} $current 
     * @param {Number} $power  
     * @param {bigint} $usr_id
     */
    constructor(
        $id: bigint, 
        $date: Date, 
        $current: Number, 
        $power: Number, 
        $usr_id: bigint
    );

    /**
     * 
     * @param {bigint} $id 
     * @param {Date} $date 
     * @param {Number} $current 
     * @param {Number} $power 
     * @param {User} $user 
     */
    constructor(
        $id: bigint, 
        $date: Date, 
        $current: Number, 
        $power: Number, 
        $user: User
    );

    /**
     * 
     * @param {bigint} $id 
     * @param {Date} $date 
     * @param {Number} $current 
     * @param {Number} $power  
     * @param {bigint} $usr_id
     * @param {bigint} $loc_id 
     */
    constructor(
        $id: bigint, 
        $date: Date, 
        $current: Number, 
        $power: Number, 
        $usr_id: bigint, 
        $loc_id: bigint
    );

    /**
     * 
     * @param {bigint} $id 
     * @param {Date} $date 
     * @param {Number} $current 
     * @param {Number} $power 
     * @param {User} $user 
     * @param {Place} $place 
     */
    constructor(
        $id: bigint, 
        $date: Date, 
        $current: Number, 
        $power: Number, 
        $user: User, 
        $place: Place
    );

    // TODO: constructor DTO

    constructor(
        $id_obj: bigint, 
        $date?: Date, 
        $current?: Number, 
        $power?: Number, 
        $user?: User | bigint, 
        $place?: Place | bigint
    ) {
        //TODO: constructor DTO

        this.id = $id_obj;
        this.date = $date!;
        this.current = $current!;
        this.power = $power!;

        if (typeof $user == 'bigint') {
            this.usr_id = $user;
        } else {
            this.user = $user;
            this.usr_id = $user!.$id;
        }

        if (typeof $place == 'bigint') {
            this.loc_id = $place;
        } else if ($place instanceof Place) {
            this.place = $place;
            this.loc_id = $place.$id;
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
     * Getter $loc_id
     * @return {bigint | undefined}
     */
	public get $loc_id(): bigint | undefined {
		return this.loc_id;
	}

    /**
     * Getter $usr_id
     * @return {bigint}
     */
	public get $usr_id(): bigint {
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
     * Setter $loc_id
     * @param {bigint} value
     */
	public set $loc_id(value: bigint) {
		this.loc_id = value;
	}

    /**
     * Setter $usr_id
     * @param {bigint} value
     */
	public set $usr_id(value: bigint) {
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
        this.loc_id = value.$id;
    }
    
}

export default Measurement;