import User from "../../models/user/User";

export class GetUserDto {
    private id : Number;
    private name : string;
    private email : string;
    private pass : string;

    /**
     * 
     * @param {Number} $id 
     * @param {string} $name 
     * @param {string} $email 
     * @param {string} $pass 
     */
	constructor($id: Number, $name: string, $email: string, $pass: string);

    /**
     * 
     * @param {User} $user 
     */
    constructor($user: User);

    constructor($idOrUser: Number | User, $name?: string, $email?: string, $pass?: string) {
        if ($idOrUser instanceof User) {
            this.id = $idOrUser.$id;
            this.name = $idOrUser.$name;
            this.email = $idOrUser.$email;
            this.pass = $idOrUser.$pass;
        } else {
            this.id = $idOrUser;
            this.name = $name!;
            this.email = $email!;
            this.pass = $pass!;
        }
    }

    /**
     * Getter $id
     * @return {Number}
     */
	public get $id(): Number {
		return this.id;
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
     * Setter $id
     * @param {Number} value
     */
	public set $id(value: Number) {
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