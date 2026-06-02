import User from "../user/User.ts";

class Place {
    private id : number;
    private name : string;
    private usr_id : number;
    private active : boolean;

    private user? : User;

    /**
     * 
     * @param {number} $id 
     * @param {string} $name 
     * @param {number} $usr_id 
     * @param {boolean} $active
     */
	constructor(
        $id: number, 
        $name: string, 
        $usr_id: number,
        $active: boolean
    );

    /**
     * 
     * @param {number} $id 
     * @param {string} $name 
     * @param {User} $user
     * @param {boolean} $active
     */
	constructor(
        $id: number, 
        $name: string, 
        $user: User,
        $active: boolean
    );
    
    // TODO: constructor DTO

    constructor(
        $id_dto: number, 
        $name?: string, 
        $user?: number | User,
        $active: boolean = true
    ) {
        // TODO constructor DTO
        
        this.id = $id_dto;
        this.name = $name!;
        this.active = $active;
        
        if (typeof $user == 'number') {
            this.usr_id = $user
        } else {
            this.user = $user as User
            this.usr_id = ($user as User).$id
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
     * Getter $usr_id
     * @return {number}
     */
	public get $usr_id(): number {
		return this.usr_id;
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
     * Setter $usr_id
     * @param {number} value
     */
	public set $usr_id(value: number) {
		this.usr_id = value;
	}

    /**
     * Setter $active
     * @param {boolean} value
     */
    public set $active(value: boolean) {
        this.active = value;
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