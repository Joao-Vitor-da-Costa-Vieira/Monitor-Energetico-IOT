import User from "../user/User.ts";

class Place {
    private id : Number;
    private name : string;
    private usr_id : Number;

    private user? : User;

    /**
     * 
     * @param {Number} $id 
     * @param {string} $name 
     * @param {Number} $usr_id 
     */
	constructor($id: Number, $name: string, $usr_id: Number);

    /**
     * 
     * @param {Number} $id 
     * @param {string} $name 
     * @param {User} $user
     */
	constructor($id: Number, $name: string, $user: User);
    
    // TODO: constructor DTO

    constructor($id_dto: Number, $name?: string, $user?: Number | User) {
        // TODO constructor DTO
        
        this.id = $id_dto;
        this.name = $name!;
        
        if ($user instanceof Number) {
            this.usr_id = $user
        } else {
            this.user = $user
            this.usr_id = $user!.$id
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
	public get $usr_id(): Number {
		return this.usr_id;
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
     * Getter $user
     * @return {User | undefined}
     */
    public get $user() : User | undefined{
        return this.user;
    }

    /**
     * Setter $user
     * @param {User} value
     */
    public set $user(value : User) {
        this.user = value;
        this.usr_id = value.$id;
    }

}

export default Place;