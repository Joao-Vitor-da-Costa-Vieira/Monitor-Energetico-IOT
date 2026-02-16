export class UpdateMeasurementDto {
    private id : bigint;
    private date? : string;
    private current? : Number;
    private power? : Number;
    private usr_id? : bigint;
    private loc_id? : bigint;

    constructor(
        $id: bigint,
        $date?: string,
        $current?: Number,
        $power?: Number,
        $usr_id?: bigint,
        $loc_id?: bigint
    ) {
        this.id = $id;
        this.date = $date;
        this.current = $current;
        this.power = $power;
        this.usr_id = $usr_id;
        this.loc_id = $loc_id;
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
     * @return {string | undefined}
     */
	public get $date(): string | undefined {
		return this.date;
	}

    /**
     * Getter $current
     * @return {Number | undefined}
     */
	public get $current(): Number | undefined {
		return this.current;
	}

    /**
     * Getter $power
     * @return {Number | undefined}
     */
	public get $power(): Number | undefined {
		return this.power;
	}

    /**
     * Getter $usr_id
     * @return {bigint | undefined}
     */
	public get $usr_id(): bigint | undefined {
		return this.usr_id;
	}

    /**
     * Getter $loc_id
     * @return {bigint | undefined}
     */
	public get $loc_id(): bigint | undefined {
		return this.loc_id;
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