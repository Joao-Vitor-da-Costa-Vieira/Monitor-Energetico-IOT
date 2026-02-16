export class CreateMeasurement {
    private date : string;
    private current : Number;
    private power : Number;
    private usr_id : bigint;
    private loc_id : bigint;

    /**
     * 
     * @param {string} $date 
     * @param {Number} $current 
     * @param {Number} $power 
     * @param {bigint} $usr_id 
     * @param {bigint} $loc_id 
     */
	constructor(
        $date: string, 
        $current: Number, 
        $power: Number, 
        $usr_id: bigint, 
        $loc_id: bigint
    ) {
        this.date = $date;
        this.current = $current;
        this.power = $power;
        this.usr_id = $usr_id;
        this.loc_id = $loc_id;
	}

    /**
     * Getter $date
     * @return {string}
     */
	public get $date(): string {
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
     * @return {bigint}
     */
	public get $usr_id(): bigint {
		return this.usr_id;
	}

    /**
     * Getter $loc_id
     * @return {bigint}
     */
	public get $loc_id(): bigint {
		return this.loc_id;
	}

    /**
     * Setter $date
     * @param {string} value
     */
	public set $date(value: string) {
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
     * Setter $usr_id
     * @param {bigint} value
     */
	public set $usr_id(value: bigint) {
		this.usr_id = value;
	}

    /**
     * Setter $loc_id
     * @param {bigint} value
     */
	public set $loc_id(value: bigint) {
		this.loc_id = value;
	}
    
}