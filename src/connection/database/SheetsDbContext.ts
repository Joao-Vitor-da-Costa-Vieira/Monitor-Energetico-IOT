import { google, sheets_v4 } from "googleapis";
import { GoogleSheetsError } from "../../errors/sheets/GoogleSheets.error.ts"
import { env } from "node:process";

class SheetsDbContext {
    private static api: sheets_v4.Sheets;
    private static initializing: Promise<void> | null;

    private static async getDbContext() : Promise<sheets_v4.Resource$Spreadsheets> {
        try {
            if (!this.api) {
                if (!this.initializing) {
                    this.initializing = this.init();
                }
                await this.initializing;
            }
            return this.api.spreadsheets;
        } catch (e) {
            throw e;
        }
    }

    private static async init() {
        try {
            const credentials = JSON.parse(env.GOOGLE_CREDENTIALS);
            credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');

            const auth = new google.auth.GoogleAuth({
                credentials,
                scopes: ["https://www.googleapis.com/auth/spreadsheets"]
            });

            this.api = google.sheets({
                version: "v4",
                auth
            });
        } catch (e: any) {
            throw new GoogleSheetsError(500, e.message);
        }
    }

    public static async get($range: string) {
        try {
            const sheet = await this.getDbContext();
            
            return sheet.values.get({
                spreadsheetId: process.env.SHEETS_URL,
                range: $range
            })
        } catch (e: any) {
            throw new GoogleSheetsError(500, e.message);
        }
    }

    public static async update($values: any[][], $range: string) {
        try {
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
        } catch (e: any) {
            throw new GoogleSheetsError(500, e.message);
        }
        
    }

    public static async append($values: any[][], $range: string) {
        try {
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
        } catch (e: any) {
            throw new GoogleSheetsError(500, e.message);
        }
    }

    public static async getByMatch(
        $value: any, 
        $page: string, 
        $colSearch: string, 
        $colStart: string, 
        $colEnd: string
    ) {
        try {
            const values = await SheetsDbContext.get(`${$page}!${$colSearch}:${$colSearch}`);

            if (!values || !values.data.values)
                return undefined;

            const rowSearch = values.data.values?.findIndex(r => r[0] == $value);

            return rowSearch == -1? 
                undefined : 
                await SheetsDbContext.get(`${$page}!${$colStart}${rowSearch + 1}:${$colEnd}${rowSearch + 1}`);
        } catch (e: any) {
            throw new GoogleSheetsError(500, e.message);
        }
    }

    public static async deleteRows(
        $sheetId: number,
        $rows: Array<number>
    ) {
        try {
            const requests = this.getRequestsForDel($sheetId, $rows);
            const sheet = await this.getDbContext();

            sheet.batchUpdate({
                spreadsheetId: process.env.SHEETS_URL,
                requestBody: {
                    requests
                }
            });
        } catch (e: any) {
            throw new GoogleSheetsError(500, e.message);
        }
    } 

    public static getRequestsForDel(
        $sheetId: number,
        $rows: Array<number>
    ) {
        const requests = $rows
        .sort((a, b) => b - a)
        .map(row => ({
            deleteDimension: {
                range: {
                    sheetId: $sheetId,
                    dimension: "ROWS",
                    startIndex: row, // Sheets usa índice base 0
                    endIndex: row + 1
                }
            }
        }));

        return requests;
    }
}

export { SheetsDbContext };