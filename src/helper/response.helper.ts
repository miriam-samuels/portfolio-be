import { Response } from "express";
import { ApiResponse } from "../interfaces/response.interface";


export class ResponseHelper {
    static success<T>(res: Response, message: string, data?: T, status = 200) {
        const response: ApiResponse<T> = {
            success: true,
            message,
            data,
        };
        return res.status(status).json(response);
    }

    static error(res: Response, message: string, error?: any, status = 500) {
        const response: ApiResponse = {
            success: false,
            message,
            data: error
        };
        return res.status(status).json(response);
    }
}
