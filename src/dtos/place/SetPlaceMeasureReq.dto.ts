export class SetPlaceMeasureReqDto {
    private name : string;

	constructor($name: string) {
		this.name = $name;
	}

    /**
     * Getter $name
     * @return {string}
     */
	public get $name(): string {
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