export class UpdateUserDto {
    private id : number;
    private name? : string;
    private email? : string;
    private pass? : string;
    private active? : boolean;

	constructor(
        $id: number,
        $name?: string, 
        $email?: string, 
        $pass?: string,
        $active?: boolean
    ) {
        this.id = $id;
		this.name = $name;
		this.email = $email;
		this.pass = $pass;
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
     * Setter $id
     * @param {number} value
     */
	public set $id(value: number) {
		this.id = value;
	}

    /**
     * Getter $name
     * @return {string | undefined}
     */
	public get $name(): string | undefined {
		return this.name;
	}

    /**
     * Getter $email
     * @return {string | undefined}
     */
	public get $email(): string | undefined {
		return this.email;
	}

    /**
     * Getter $pass
     * @return {string | undefined}
     */
	public get $pass(): string | undefined {
		return this.pass;
	}

    /**
     * Getter $active
     * @return {boolean | undefined}
     */
    public get $active(): boolean | undefined {
        return this.active;
    }

    /**
     * Setter $name
     * @param {string} value
     */
	public set $name(value: string) {
		this.name = value;
	}

    /**
     * Setter $email
     * @param {string} value
     */
	public set $email(value: string) {
		this.email = value;
	}

    /**
     * Setter $pass
     * @param {string} value
     */
	public set $pass(value: string) {
		this.pass = value;
	}

    /**
     * Setter $active
     * @param {boolean} value
     */
    public set $active(value: boolean) {
        this.active = value;
    }
}