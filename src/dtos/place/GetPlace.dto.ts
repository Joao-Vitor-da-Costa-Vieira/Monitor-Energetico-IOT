import { GetUserDto } from '../user/GetUser.dto.ts'
import User from '../../models/user/User.ts'
import Place from '../../models/place/Place.ts';

export class GetPlaceDto {
    private id : Number;
    private name : string;
    private usr_id? : Number;
    private user? : GetUserDto;

    /**
     * 
     * @param {Number} $id 
     * @param {string} $name
     */
    constructor(
        $id: Number, 
        $name: string
    );

    /**
     * 
     * @param {Number} $id 
     * @param {string} $name 
     * @param {Number} $usr_id 
     */
    constructor(
        $id: Number,
        $name: string,
        $usr_id: Number
    )

    /**
     * 
     * @param {Number} $id 
     * @param {string} $name 
     * @param {User} $user 
     */
    constructor(
        $id: Number,
        $name: string,
        $user: User
    );

    /**
     * 
     * @param {Number} $id 
     * @param {string} $name 
     * @param {GetUserDto} $user 
     */
    constructor(
        $id: Number,
        $name: string,
        $user: GetUserDto
    );

    /**
     * 
     * @param {Place} $place 
     */
    constructor($place: Place);

    constructor(
        $idOrObj: Number | Place,
        $name?: string,
        $user?: User | GetUserDto | Number
    ) {
        if ($idOrObj instanceof Place) {
            this.id = $idOrObj.$id;
            this.name = $idOrObj.$name;
            this.user = $idOrObj.$user ? new GetUserDto($idOrObj.$user) : undefined;
            return;
        }
        
        this.id = $idOrObj;
        this.name = $name!;

        if ($user instanceof GetUserDto) {
            this.user = $user;
        } else if ($user instanceof User) {
            this.user = new GetUserDto($user);
        } else if (typeof $user == 'number') {
            this.usr_id = $user
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
     * Getter $usr_id
     * @return {Number}
     */
	public get $usr_id(): Number | undefined {
		return this.usr_id;
	}

    /**
     * Getter $user
     * @return {GetUserDto}
     */
	public get $user(): GetUserDto | undefined {
		return this.user;
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
     * Setter $usr_id
     * @param {Number} value
     */
	public set $usr_id(value: Number) {
		this.usr_id = value;
	}

    /**
     * Setter $user
     * @param {GetUserDto | User} value
     */
	public set $user(value: GetUserDto | User) {
		if (value instanceof GetUserDto) {
            this.user = value;
        } else {
            this.user = new GetUserDto(value);
        }
	}
    
}