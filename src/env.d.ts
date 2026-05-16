declare global {
    namespace NodeJS {
        interface ProcessEnv {
            SHEETS_URL: string;
            ENCRYPT_KEY: string;
            GOOGLE_CREDENTIALS: string;
        }
    }
}

export {};