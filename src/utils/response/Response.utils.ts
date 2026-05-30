import { AbstractApiError } from "../../errors/AbstractApi.error.ts";
import { Response } from "express";

export abstract class ResponseUtils {
    /**
     * ReturnErrorResponse
     * @param {Response} res
     * @param {AbstractApiError} e
     */
    public static returnApiErrorResponse(res: Response, e: AbstractApiError) {
        console.error(e.$consoleLog);
        return res.status(e.$statusCode).send({"message": e.$message});
    }

    /**
     * returnGenericErrorResponse
     * @param {Response} res 
     * @param {Error} e 
     * @param {number} httpCode 
     */
    public static returnGenericErrorResponse(res: Response, e: Error, httpCode: number = 500) {
        console.error(e);
        return res.status(httpCode).send({"message": e.message});
    }

    /**
     * returnObjectResponse
     * @param {Response} res
     * @param {Object} obj
     * @param {number} httpCode
     */
    public static returnObjectResponse(res: Response, obj: Object, httpCode: number = 200) {
        return res.status(200).send(obj);
    }
}