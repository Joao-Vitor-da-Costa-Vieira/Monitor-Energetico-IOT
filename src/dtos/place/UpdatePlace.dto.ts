export class UpdatePlaceDto {
    private id : Number;
    private name? : string;
    private user_id? : Number;

	constructor(
        $id: Number, 
        $name?: string, 
        $user_id?: Number
    ) {
        this.id = $id;
        this.name = $name;
        this.user_id = $user_id;
	}

    /**
     * Getter $id
     * @return {Number}
     */
	public get $id(): Number {
		return this.id;
	}
    
    /**
     * Getter $name
     * @return {string | undefined}
     */
	public get $name(): string | undefined {
		return this.name;
	}

    /**
     * Getter $user_id
     * @return {Number | undefined}
     */
	public get $user_id(): Number | undefined {
		return this.user_id;
	}

    /**
     * Setter $id
     * @param {Number} value
     */
	public set $id(value: Number) {
		this.id = value;
	}

    /**
     * Setter $name
     * @param {string} value
     */
	public set $name(value: string) {
		this.name = value;
	}

    /**
     * Setter $user_id
     * @param {Number} value
     */
	public set $user_id(value: Number) {
		this.user_id = value;
	}
}