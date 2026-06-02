import { AbstractApiError } from "../AbstractApi.error.ts";

export class GoogleSheetsError extends AbstractApiError {
    public constructor(
        $statusCode: number,
        $message: string
    ) {
        super($statusCode, $message);
    }
}