export class UpdateMeasurementDto {
    private id : number;
    private date? : string;
    private current? : number;
    private power? : number;
    private usr_id? : number;
    private plc_id? : number;

    constructor(
        $id: number,
        $date?: string,
        $current?: number,
        $power?: number,
        $usr_id?: number,
        $plc_id?: number
    ) {
        this.id = $id;
        this.date = $date;
        this.current = $current;
        this.power = $power;
        this.usr_id = $usr_id;
        this.plc_id = $plc_id;
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
     * @return {string | undefined}
     */
	public get $date(): string | undefined {
		return this.date;
	}

    /**
     * Getter $current
     * @return {number | undefined}
     */
	public get $current(): number | undefined {
		return this.current;
	}

    /**
     * Getter $power
     * @return {number | undefined}
     */
	public get $power(): number | undefined {
		return this.power;
	}

    /**
     * Getter $usr_id
     * @return {number | undefined}
     */
	public get $usr_id(): number | undefined {
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
     * Setter $id
     * @param {number} value
     */
	public set $id(value: number) {
		this.id = value;
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