export abstract class AbstractApiError extends Error {
    private statusCode: number;

    protected constructor(
        $statusCode: number,
        $message: string
    ) {
        super($message);
        this.statusCode = $statusCode;
    }

    /**
     * Getter $statusCode
     * @return {number}
     */
	public get $statusCode(): number {
		return this.statusCode;
	}

    /**
     * Getter $message
     * @return {string}
     */
    public get $message(): string {
        return this.message;
    }

    /**
     * Setter $statusCode
     * @param {number} value
     */
	public set $statusCode(value: number) {
		this.statusCode = value;
	}

    /**
     * Setter $message
     * @param {string} value
     */
    public set $message(value: string) {
        this.message = value;
    }

    public get $consoleLog() {
        return `[${this.statusCode}] - ${this.stack}`
    }
}