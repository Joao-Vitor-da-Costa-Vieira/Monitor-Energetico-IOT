import { google, sheets_v4 } from "googleapis";
import path from "node:path";

class SheetsDbContext {
    private static api: sheets_v4.Sheets;
    private static initializing: Promise<void> | null;

    static async getDbContext() : Promise<sheets_v4.Resource$Spreadsheets> {
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
}

export { SheetsDbContext };