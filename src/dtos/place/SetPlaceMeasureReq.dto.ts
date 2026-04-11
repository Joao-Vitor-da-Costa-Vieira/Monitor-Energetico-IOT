export class SetPlaceMeasureReqDto {
    private id? : number;
    private name? : string;

    /**
     * 
     * @param {string} $name 
     */
	constructor($name: string)

    /**
     * 
     * @param {number} $id 
     */
    constructor($id: number)

    /**
     * 
     * @param {string | number} $value 
     */
    constructor($value: string | number) {
        if (typeof $value == 'string')
            this.name = $value;
        else if (typeof $value == 'number') {
            this.$id = $value;
        }
    }

    /**
     * Getter $id
     * @return {number}
     */
	public get $id(): number | undefined {
		return this.id;
	}

    /**
     * Setter $id
     * @param {number} value
     */
	public set $id(value: number) {
		this.id = value;
	}
    
    /**
     * Getter $name
     * @return {string}
     */
	public get $name(): string | undefined {
		return this.name;
	}

    /**
     * Setter $name
     * @param {string} value
     */
	public set $name(value: string) {
		this.name = value;
	}
    
}