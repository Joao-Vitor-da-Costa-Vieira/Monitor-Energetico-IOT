import Place from "../../models/place/Place.ts";
import User from "../../models/user/User.ts";
import { GetUserDto } from "../user/GetUser.dto.ts";
import { UserResponseDto } from "../user/UserResponse.dto.ts";
import { GetPlaceDto } from "./GetPlace.dto.ts";

export class PlaceResponseDto {
    private id : number;
    private name : string;
    private usr_id? : number;
    private active : boolean;

    private user? : UserResponseDto;

    /**
     * 
     * @param {number} $id 
     * @param {string} $name
     * @param {boolean} $active
     */
    constructor(
        $id: number, 
        $name: string,
        $active: boolean
    );

    /**
     * 
     * @param {number} $id 
     * @param {string} $name 
     * @param {boolean} $active
     * @param {number} $usr_id 
     */
    constructor(
        $id: number,
        $name: string,
        $active: boolean,
        $usr_id: number
    )

    /**
     * 
     * @param {number} $id 
     * @param {string} $name 
     * @param {boolean} $active
     * @param {User} $user 
     */
    constructor(
        $id: number,
        $name: string,
        $active: boolean,
        $user: User
    );

    /**
     * 
     * @param {number} $id 
     * @param {string} $name 
     * @param {boolean} $active
     * @param {GetUserDto} $user 
     */
    constructor(
        $id: number,
        $name: string,
        $active: boolean,
        $user: GetUserDto
    );

    /**
     * 
     * @param {Place} $place 
     */
    constructor($place: Place);
    
    /**
     * 
     * @param {GetPlaceDto} $placeDto 
     */
    constructor($placeDto: GetPlaceDto);

    constructor(
        $idOrObjOrDto: number | Place | GetPlaceDto,
        $name?: string,
        $active?: boolean,
        $user?: User | GetUserDto | number
    ) {
        if ($idOrObjOrDto instanceof Place) {
            this.id = $idOrObjOrDto.$id;
            this.name = $idOrObjOrDto.$name;
            this.active = $idOrObjOrDto.$active;
            this.usr_id = $idOrObjOrDto.$usr_id;
            this.user = $idOrObjOrDto.$user ? new UserResponseDto($idOrObjOrDto.$user) : undefined;
            return;
        }

        if ($idOrObjOrDto instanceof GetPlaceDto) {
            this.id = $idOrObjOrDto.$id;
            this.name = $idOrObjOrDto.$name;
            this.active = $idOrObjOrDto.$active;
            this.usr_id = $idOrObjOrDto.$usr_id;
            this.user = $idOrObjOrDto.$user ? new UserResponseDto($idOrObjOrDto.$user) : undefined;
            return;
        }
        
        this.id = $idOrObjOrDto;
        this.name = $name!;
        this.active = $active!;

        if ($user instanceof GetUserDto) {
            this.user = new UserResponseDto($user);
            this.usr_id = $user.$id;
        } else if ($user instanceof User) {
            this.user = new UserResponseDto($user);
            this.usr_id = this.user.$id;
        } else if (typeof $user == 'number') {
            this.usr_id = $user;
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
     * Getter $active
     * @return {boolean}
     */
    public get $active(): boolean {
        return this.active;
    }

    /**
     * Getter $usr_id
     * @return {number}
     */
	public get $usr_id(): number | undefined {
		return this.usr_id;
	}

    /**
     * Getter $user
     * @return {UserResponseDto}
     */
	public get $user(): UserResponseDto | undefined {
		return this.user;
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
     * Setter $active
     * @param {boolean} value
     */
    public set $active(value: boolean) {
        this.active = value;
    }

    /**
     * Setter $usr_id
     * @param {number} value
     */
	public set $usr_id(value: number) {
		this.usr_id = value;
	}

    /**
     * Setter $user
     * @param {UserResponseDto | GetUserDto | User} value
     */
	public set $user(value: UserResponseDto | GetUserDto | User) {
		if (value instanceof UserResponseDto) {
            this.user = value;
        } else if (value instanceof GetUserDto) {
            this.user = new UserResponseDto(value);
        } else {
            this.user = new UserResponseDto(value);
        }

        this.usr_id = this.user.$id;
	}
    
}