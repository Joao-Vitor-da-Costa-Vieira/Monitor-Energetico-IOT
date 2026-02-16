export class CreatePlaceDto {
    private name : string;
    private user_id : Number;

	constructor($name: string, $user_id: Number) {
		this.name = $name;
		this.user_id = $user_id;
	}

    /**
     * Getter $name
     * @return {string}
     */
	public get $name(): string {
		return this.name;
	}

    /**
     * Getter $user_id
     * @return {Number}
     */
	public get $user_id(): Number {
		return this.user_id;
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