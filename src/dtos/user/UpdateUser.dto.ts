export class UpdateUserDto {
    private id : Number;
    private name? : string;
    private email? : string;
    private pass? : string;

	constructor(
        $id: Number,
        $name?: string, 
        $email?: string, 
        $pass?: string
    ) {
        this.id = $id;
		this.name = $name;
		this.email = $email;
		this.pass = $pass;
	}

    /**
     * Getter $id
     * @return {Number}
     */
	public get $id(): Number {
		return this.id;
	}

    /**
     * Setter $id
     * @param {Number} value
     */
	public set $id(value: Number) {
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

}