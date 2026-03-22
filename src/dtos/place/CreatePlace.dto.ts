export class CreatePlaceDto {
    private name : string;
    private user_id : number;

	constructor($name: string, $user_id: number) {
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
     * @return {number}
     */
	public get $user_id(): number {
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
     * @param {number} value
     */
	public set $user_id(value: number) {
		this.user_id = value;
	}

}