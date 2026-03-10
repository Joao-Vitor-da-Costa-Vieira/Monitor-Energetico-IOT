import { google, sheets_v4 } from "googleapis";
import path from "node:path";

class SheetsDbContext {
    private static api: sheets_v4.Sheets;
    private static initializing: Promise<void> | null;

    private static async getDbContext() : Promise<sheets_v4.Resource$Spreadsheets> {
        if (!this.api) {
            if (!this.initializing) {
                this.initializing = this.init();
            }
            await this.initializing;
        }
        return this.api.spreadsheets;
    }

    private static async init() {
        const auth = new google.auth.GoogleAuth({
            keyFile: path.resolve(process.cwd(), "environment", "credenciais.json"),
            scopes: ["https://www.googleapis.com/auth/spreadsheets"]
        });

        this.api = google.sheets({
            version: "v4",
            auth
        });
    }

    public static async get($range: string) {
        const sheet = await this.getDbContext();
        
        return sheet.values.get({
            spreadsheetId: process.env.SHEETS_URL,
            range: $range
        })
    }

    public static async update($values: any[][], $range: string) {
        const sheet = await this.getDbContext();

        return sheet.values.update({
            spreadsheetId: process.env.SHEETS_URL,
            range: $range,
            valueInputOption: 'USER_ENTERED',
            includeValuesInResponse: true,
            requestBody: {
                majorDimension: 'ROWS',
                values: $values
            }
        })
    }

    public static async append($values: any[][], $range: string) {
        const sheet = await this.getDbContext();

        return sheet.values.append({
            spreadsheetId: process.env.SHEETS_URL,
            range: $range,
            valueInputOption: 'USER_ENTERED',
            includeValuesInResponse: true,
            requestBody: {
                majorDimension: 'ROWS',
                values: $values
            }
        })
    }

    public static async getByMatch(
        $value: any, 
        $page: string, 
        $colSearch: string, 
        $colStart: string, 
        $colEnd: string
    ) {
        const values = await SheetsDbContext.get(`${$page}!${$colSearch}:${$colSearch}`);

        if (!values || !values.data.values)
            return undefined;

        const rowSearch = values.data.values?.findIndex(r => r[0] == $value);

        return rowSearch == -1? 
            undefined : 
            await SheetsDbContext.get(`${$page}!${$colStart}${rowSearch + 1}:${$colEnd}${rowSearch + 1}`);
    }

    public static async deleteRow(
        $sheetId: number,
        $rowNumber: number
    ) {
        const sheet = await this.getDbContext();

        const response = sheet.batchUpdate({
            spreadsheetId: process.env.SHEETS_URL,
            requestBody: {
                requests: [
                    {
                        deleteDimension: {
                            range: {
                                sheetId: $sheetId,
                                dimension: 'ROWS',
                                startIndex: $rowNumber,
                                endIndex: $rowNumber + 1
                            }
                        }
                    }
                ]
            }
        })
    }
}

export { SheetsDbContext };