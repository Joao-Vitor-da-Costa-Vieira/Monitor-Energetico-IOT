export class CreateUserDto {
    private name : string;
    private email : string;
    private pass : string;

	constructor(
        $name: string, 
        $email: string,
        $pass: string
    ) {
        this.name = $name;
        this.email = $email;
        this.pass = $pass;
	}

    /**
     * Getter $name
     * @return {string}
     */
	public get $name(): string {
		return this.name;
	}

    /**
     * Getter $email
     * @return {string}
     */
	public get $email(): string{
		return this.email;
	}

    /**
     * Getter $pass
     * @return {string}
     */
	public get $pass(): string{
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