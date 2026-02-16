import { GetUserDto } from '../user/GetUser.dto.ts'
import User from '../../models/user/User.ts'
import Place from '../../models/place/Place.ts';

export class GetPlaceDto {
    private id : Number;
    private name : string;
    private user : GetUserDto;

    /**
     * 
     * @param {Number} $id 
     * @param {string} $name 
     * @param {User} $user 
     */
    constructor($id: Number, $name: string, $user: User);

    /**
     * 
     * @param {Number} $id 
     * @param {string} $name 
     * @param {GetUserDto} $user 
     */
    constructor($id: Number, $name: string, $user: GetUserDto);

    /**
     * 
     * @param {Place} $place 
     */
    constructor($place: Place);

    constructor($idOrObj: Number | Place, $name?: string, $user?: User | GetUserDto) {
        if ($idOrObj instanceof Place) {
            this.id = $idOrObj.$id;
            this.name = $idOrObj.$name;
            this.user = new GetUserDto($idOrObj.$user!);
            return;
        }
        
        this.id = $idOrObj;
        this.name = $name!;

        if ($user instanceof GetUserDto) {
            this.user = $user;
        } else {
            this.user = new GetUserDto($user!);
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
     * Getter $user
     * @return {GetUserDto}
     */
	public get $user(): GetUserDto {
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