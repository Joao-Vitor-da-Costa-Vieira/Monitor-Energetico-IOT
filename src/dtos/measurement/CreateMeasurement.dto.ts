export class CreateMeasurementDto {
    private date : string;
    private current : Number;
    private power : Number;
    private usr_id : Number;
    private plc_id? : Number;

    /**
     * 
     * @param {string} $date 
     * @param {Number} $current 
     * @param {Number} $power 
     * @param {Number} $usr_id 
     * @param {Number | undefined} $plc_id 
     */
	constructor(
        $date: string, 
        $current: Number, 
        $power: Number, 
        $usr_id: Number, 
        $plc_id?: Number
    ) {
        this.date = $date;
        this.current = $current;
        this.power = $power;
        this.usr_id = $usr_id;
        this.plc_id = $plc_id;
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
     * @return {Number}
     */
	public get $usr_id(): Number {
		return this.usr_id;
	}

    /**
     * Getter $plc_id
     * @return {Number | undefined}
     */
	public get $plc_id(): Number | undefined {
		return this.plc_id;
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
     * @param {Number} value
     */
	public set $usr_id(value: Number) {
		this.usr_id = value;
	}

    /**
     * Setter $plc_id
     * @param {Number} value
     */
	public set $plc_id(value: Number) {
		this.plc_id = value;
	}
    
}