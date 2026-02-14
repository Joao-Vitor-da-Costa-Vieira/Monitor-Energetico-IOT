export class CreatePlaceDto {
    private name : string;
    private user_id : bigint;

	constructor($name: string, $user_id: bigint) {
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
     * @return {bigint}
     */
	public get $user_id(): bigint {
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
     * @param {bigint} value
     */
	public set $user_id(value: bigint) {
		this.user_id = value;
	}

}