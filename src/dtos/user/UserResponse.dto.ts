import User from "../../models/user/User";
import { GetUserDto } from "./GetUser.dto";

export class UserResponseDto {
    private id : number;
    private name : string;
    private email : string;
    private active : boolean;

    /**
     * 
     * @param {number} $id 
     * @param {string} $name 
     * @param {string} $email
     * @param {boolean} $active
     */
	constructor(
        $id: number, 
        $name: string, 
        $email: string,
        $active: boolean
    );

    /**
     * 
     * @param {User} $user 
     */
    constructor($user: User);
    
    /**
     * 
     * @param {GetUserDto} $userDto 
     */
    constructor($userDto: GetUserDto);

    constructor(
        $idUserOrDto: number | User | GetUserDto, 
        $name?: string, 
        $email?: string,
        $active?: boolean
    ) {
        if ($idUserOrDto instanceof User) {
            this.id = $idUserOrDto.$id;
            this.name = $idUserOrDto.$name;
            this.email = $idUserOrDto.$email;
            this.active = $idUserOrDto.$active;
        } else if ($idUserOrDto instanceof GetUserDto) {
            this.id = $idUserOrDto.$id;
            this.name = $idUserOrDto.$name;
            this.email = $idUserOrDto.$email;
            this.active = $idUserOrDto.$active;
        } else {
            this.id = $idUserOrDto;
            this.name = $name!;
            this.email = $email!;
            this.active = $active!;
        }
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
     * Getter $active
     * @return {boolean}
     */
    public get $active(): boolean {
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
     * Setter $email
     * @param {string} value
     */
	public set $email(value: string) {
		this.email = value;
	}

    /**
     * Setter $active
     * @param {boolean} value
     */
    public set $active(value: boolean) {
        this.active = value;
    }
}