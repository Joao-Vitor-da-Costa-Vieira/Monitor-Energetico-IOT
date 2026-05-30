export class LoginSingleton {
    private static instance : LoginSingleton;
    private userId? : number;
    private placeId? : number;

    public static GetInstance() : LoginSingleton {
        if (!this.instance)
            this.instance = new LoginSingleton();

        return this.instance;
    }

    /**
     * Getter userId
     * @returns {number | undefined}
     */
    public get $userId() : number | undefined {
        return this.userId
    }

    /**
     * Setter userId
     * @param {number | undefined} value
     */
    public set $userId(value: number | undefined) {
        this.userId = value;
    }

    /**
     * Getter $placeId
     * @return {number }
     */
	public get $placeId(): number | undefined  {
		return this.placeId;
	}

    /**
     * Setter $placeId
     * @param {number } value
     */
	public set $placeId(value: number | undefined ) {
		this.placeId = value;
	}

}