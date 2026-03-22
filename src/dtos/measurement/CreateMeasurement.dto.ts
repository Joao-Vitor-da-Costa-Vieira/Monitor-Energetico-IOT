export class CreateMeasurementDto {
    private date : string;
    private current : number;
    private power : number;
    private usr_id : number;
    private plc_id? : number;

    /**
     * 
     * @param {string} $date 
     * @param {number} $current 
     * @param {number} $power 
     * @param {number} $usr_id 
     * @param {number | undefined} $plc_id 
     */
	constructor(
        $date: string, 
        $current: number, 
        $power: number, 
        $usr_id: number, 
        $plc_id?: number
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
     * @return {number}
     */
	public get $usr_id(): number {
		return this.usr_id;
	}

    /**
     * Getter $plc_id
     * @return {number | undefined}
     */
	public get $plc_id(): number | undefined {
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
     * Setter $usr_id
     * @param {number} value
     */
	public set $usr_id(value: number) {
		this.usr_id = value;
	}

    /**
     * Setter $plc_id
     * @param {number} value
     */
	public set $plc_id(value: number) {
		this.plc_id = value;
	}
    
}