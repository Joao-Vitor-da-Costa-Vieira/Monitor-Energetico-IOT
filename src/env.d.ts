declare global {
    namespace NodeJS {
        interface ProcessEnv {
            SHEETS_URL: string;
        }
    }
}

export {};