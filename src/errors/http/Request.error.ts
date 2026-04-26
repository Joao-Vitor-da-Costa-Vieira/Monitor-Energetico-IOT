import { ResponseError } from "../response/Response.error.ts";

export class RequestError extends ResponseError {
    public constructor(
        $statusCode: number,
        $message: string
    ) {
        super($statusCode, $message);
    }
}