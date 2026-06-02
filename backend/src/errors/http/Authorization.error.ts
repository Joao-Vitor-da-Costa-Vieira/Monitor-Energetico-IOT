import { AbstractApiError } from "../AbstractApi.error.ts";

export class AuthorizationError extends AbstractApiError {
    public constructor(
        $statusCode: number,
        $message: string
    ) {
        super($statusCode, $message);
    }
}