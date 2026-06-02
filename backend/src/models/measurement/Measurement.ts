import Place from "../place/Place.ts";
import User from "../user/User.ts";

class Measurement {
    private id : number;
    private date : Date;
    private current : number;
    private power : number;
    private usr_id : number;
    private plc_id? : number;

    private user? : User;
    private place? : Place;

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
     * @param {User} $user 
     */
    constructor(
        $id: number, 
        $date: Date, 
        $current: number, 
        $power: number, 
        $user: User
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
     * @param {User} $user 
     * @param {Place} $place 
     */
    constructor(
        $id: number, 
        $date: Date, 
        $current: number, 
        $power: number, 
        $user: User, 
        $place: Place
    );

    // TODO: constructor DTO

    constructor(
        $id_obj: number, 
        $date?: Date, 
        $current?: number, 
        $power?: number, 
        $user?: User | number, 
        $place?: Place | number
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
     * Getter $plc_id
     * @return {number | undefined}
     */
	public get $plc_id(): number | undefined {
		return this.plc_id;
	}

    /**
     * Getter $usr_id
     * @return {number}
     */
	public get $usr_id(): number {
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
     * Setter $plc_id
     * @param {number} value
     */
	public set $plc_id(value: number) {
		this.plc_id = value;
	}

    /**
     * Setter $usr_id
     * @param {number} value
     */
	public set $usr_id(value: number) {
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