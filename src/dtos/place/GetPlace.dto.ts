import { GetUserDto } from '../user/GetUser.dto.ts'
import User from '../../models/user/User.ts'
import Place from '../../models/place/Place.ts';

export class GetPlaceDto {
    private id : Number;
    private name : string;
    private usr_id? : Number;
    private active : boolean;

    private user? : GetUserDto;

    /**
     * 
     * @param {Number} $id 
     * @param {string} $name
     * @param {boolean} $active
     */
    constructor(
        $id: Number, 
        $name: string,
        $active: boolean
    );

    /**
     * 
     * @param {Number} $id 
     * @param {string} $name 
     * @param {boolean} $active
     * @param {Number} $usr_id 
     */
    constructor(
        $id: Number,
        $name: string,
        $active: boolean,
        $usr_id: Number
    )

    /**
     * 
     * @param {Number} $id 
     * @param {string} $name 
     * @param {boolean} $active
     * @param {User} $user 
     */
    constructor(
        $id: Number,
        $name: string,
        $active: boolean,
        $user: User
    );

    /**
     * 
     * @param {Number} $id 
     * @param {string} $name 
     * @param {boolean} $active
     * @param {GetUserDto} $user 
     */
    constructor(
        $id: Number,
        $name: string,
        $active: boolean,
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
        $active?: boolean,
        $user?: User | GetUserDto | Number
    ) {
        if ($idOrObj instanceof Place) {
            this.id = $idOrObj.$id;
            this.name = $idOrObj.$name;
            this.active = $idOrObj.$active;
            this.user = $idOrObj.$user ? new GetUserDto($idOrObj.$user) : undefined;
            return;
        }
        
        this.id = $idOrObj;
        this.name = $name!;
        this.active = $active!;

        if ($user instanceof GetUserDto) {
            this.user = $user;
            this.usr_id = $user.$id;
        } else if ($user instanceof User) {
            this.user = new GetUserDto($user);
            this.usr_id = this.user.$id;
        } else if (typeof $user == 'number') {
            this.usr_id = $user;
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
     * Getter $active
     * @return {boolean}
     */
    public get $active(): boolean {
        return this.active;
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
     * Setter $active
     * @param {boolean} value
     */
    public set $active(value: boolean) {
        this.active = value;
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
            this.usr_id = value.$id;
        } else {
            this.user = new GetUserDto(value);
            this.usr_id = this.user.$id;
        }
	}
    
}