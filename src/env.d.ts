declare global {
    namespace NodeJS {
        interface ProcessEnv {
            SHEETS_URL: string;
            GOOGLE_CREDENTIALS: string;
        }
    }
}

export {};