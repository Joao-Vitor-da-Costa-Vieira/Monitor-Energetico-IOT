import User from "../user/User.ts";

class Place {
    private id : bigint;
    private name : string;
    private usr_id : bigint;

    private user? : User;

    /**
     * 
     * @param {bigint} $id 
     * @param {string} $name 
     * @param {bigint} $usr_id 
     */
	constructor($id: bigint, $name: string, $usr_id: bigint);

    /**
     * 
     * @param {bigint} $id 
     * @param {string} $name 
     * @param {User} $user
     */
	constructor($id: bigint, $name: string, $user: User);
    
    // TODO: constructor DTO

    constructor($id_dto: bigint, $name?: string, $user?: bigint | User) {
        // TODO constructor DTO
        
        this.id = $id_dto;
        this.name = $name!;
        
        if (typeof $user == 'bigint') {
            this.usr_id = $user
        } else {
            this.user = $user
            this.usr_id = $user!.$id
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
     * Getter $usr_id
     * @return {bigint}
     */
	public get $usr_id(): bigint {
		return this.usr_id;
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
     * Setter $usr_id
     * @param {bigint} value
     */
	public set $usr_id(value: bigint) {
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