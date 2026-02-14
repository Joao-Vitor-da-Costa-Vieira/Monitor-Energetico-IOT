import { GetUserDto } from '../user/GetUser.dto.ts'
import User from '../../models/user/User.ts'
import Place from '../../models/place/Place.ts';

export class GetPlaceDto {
    private id : bigint;
    private name : string;
    private user : GetUserDto;

    /**
     * 
     * @param {bigint} $id 
     * @param {string} $name 
     * @param {User} $user 
     */
    constructor($id: bigint, $name: string, $user: User);

    /**
     * 
     * @param {bigint} $id 
     * @param {string} $name 
     * @param {GetUserDto} $user 
     */
    constructor($id: bigint, $name: string, $user: GetUserDto);

    /**
     * 
     * @param {Place} $place 
     */
    constructor($place: Place);

    constructor($idOrObj: bigint | Place, $name?: string, $user?: User | GetUserDto) {
        if (typeof $idOrObj != 'bigint') {
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
     * @return {bigint}
     */
	public get $id(): bigint {
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
     * @param {bigint} value
     */
	public set $id(value: bigint) {
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