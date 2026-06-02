export class LoginRequestDto {
    private email : string;
    private pass : string;

	constructor($email: string, $pass: string) {
		this.email = $email;
		this.pass = $pass;
	}

    /**
     * Getter $email
     * @return {string}
     */
	public get $email(): string {
		return this.email;
	}

    /**
     * Getter $pass
     * @return {string}
     */
	public get $pass(): string {
		return this.pass;
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