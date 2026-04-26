import { ResponseError } from "../response/Response.error";

export class AuthorizationError extends ResponseError {
    public constructor(
        $statusCode: number,
        $message: string
    ) {
        super($statusCode, $message);
    }
}