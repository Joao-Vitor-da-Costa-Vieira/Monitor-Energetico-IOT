export class UpdateUserDto {
    private name : string | undefined;
    private email : string | undefined;
    private pass : string | undefined;

	constructor(
        $name: string | undefined, 
        $email: string | undefined, 
        $pass: string | undefined
    ) {
		this.name = $name;
		this.email = $email;
		this.pass = $pass;
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