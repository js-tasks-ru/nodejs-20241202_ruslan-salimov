import {ArgumentsHost, Catch, ExceptionFilter, HttpException} from "@nestjs/common";
import { Response } from 'express';
import {appendFileSync} from 'fs';
@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const message = exception.message;
    const date = new Date().toISOString();
    let response = host.switchToHttp().getResponse<Response>();
    const status = exception instanceof HttpException ? exception.getStatus() : 500;
    appendFileSync("errors.log", `[${date}] ${status} - ${message}\n`);
    response
        .status(status)
        .json({
          "statusCode": status,
          "message": message,
          "timestamp": date
        });

  }
}
