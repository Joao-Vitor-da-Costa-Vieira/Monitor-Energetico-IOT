export class UpdatePlaceDto {
    private id : bigint;
    private name? : string;
    private user_id? : bigint;

	constructor(
        $id: bigint, 
        $name?: string, 
        $user_id?: bigint
    ) {
        this.id = $id;
        this.name = $name;
        this.user_id = $user_id;
	}

    /**
     * Getter $id
     * @return {bigint}
     */
	public get $id(): bigint {
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
     * @return {bigint | undefined}
     */
	public get $user_id(): bigint | undefined {
		return this.user_id;
	}

    /**
     * Setter $id
     * @param {bigint} value
     */
	public set $id(value: bigint) {
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
     * @param {bigint} value
     */
	public set $user_id(value: bigint) {
		this.user_id = value;
	}
}