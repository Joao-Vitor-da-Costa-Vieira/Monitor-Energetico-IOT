export class LoginSingleton {
    private static instance : LoginSingleton;
    private userId : number | undefined;

    private constructor() {

    }

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
}