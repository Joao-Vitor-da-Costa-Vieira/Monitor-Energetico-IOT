export class UpdatePlaceDto {
    private id : number;
    private name? : string;
    private user_id? : number;
    private active? : boolean;

	constructor(
        $id: number, 
        $name?: string, 
        $user_id?: number,
        $active?: boolean
    ) {
        this.id = $id;
        this.name = $name;
        this.user_id = $user_id;
        this.active = $active;
	}

    /**
     * Getter $id
     * @return {number}
     */
	public get $id(): number {
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
     * @return {number | undefined}
     */
	public get $user_id(): number | undefined {
		return this.user_id;
	}

    /**
     * Getter $active
     * @return {boolean | undefined}
     */
    public get $active(): boolean | undefined {
        return this.active;
    }

    /**
     * Setter $id
     * @param {number} value
     */
	public set $id(value: number) {
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
     * @param {number} value
     */
	public set $user_id(value: number) {
		this.user_id = value;
	}

    /**
     * Setter $active
     * @param {boolean} value
     */
    public set $active(value: boolean) {
        this.active = value;
    }
}