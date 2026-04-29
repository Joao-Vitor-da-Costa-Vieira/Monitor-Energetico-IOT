import { AbstractApiError } from "../AbstractApi.error.ts";

export class BussinessRuleError extends AbstractApiError {
    public constructor (
        $statusCode: number,
        $message: string
    ) {
        super($statusCode, $message);
    }
}