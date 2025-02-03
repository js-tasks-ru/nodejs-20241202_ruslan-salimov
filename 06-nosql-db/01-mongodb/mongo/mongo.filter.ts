import {ArgumentsHost, Catch, ExceptionFilter, HttpStatus} from "@nestjs/common";
import {Response} from "express";
import mongoose from "mongoose";

@Catch(mongoose.Error.ValidationError, mongoose.mongo.MongoError)
export class MongoFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        let message = 'Database exception';
        let statusCode: number  = HttpStatus.BAD_REQUEST;
        if (exception instanceof mongoose.Error.ValidationError) {
            message = "Validation error message";
        } else if (exception instanceof mongoose.mongo.MongoError) {
            message = "Duplicate key error"
        }
        response
            .status(statusCode)
            .json({
                error: "Bad Request",
                statusCode,
                message
            });
    }
}
