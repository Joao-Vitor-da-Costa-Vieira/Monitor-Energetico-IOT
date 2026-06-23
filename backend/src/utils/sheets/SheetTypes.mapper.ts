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

    public static convertDecSeparator(value: string) : number {
        if (typeof value !== "string") {
            throw new Error("Valor sendo convertido precisa ser uma string");
        }

        value = value.replaceAll(",",".");
        console.log(value);

        if (!isFinite(Number(value))) {
            throw new Error("Valor recebido não é um número.");
        } else {
            return Number(value);
        }
    }
}