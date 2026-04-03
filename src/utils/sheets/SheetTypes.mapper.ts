export abstract class SheetTypeMapper {
    public static convertSheetBool(value: string) : boolean {
        if (value.toUpperCase() === 'TRUE') {
            return true;
        } else if (value.toUpperCase() === 'FALSE') {
            return false;
        } else {
            throw new Error(`O valor do parâmetro deve ser igual a "TRUE" ou "FALSE", mas o valor recebido foi "${value}".`)
        }
    }
}