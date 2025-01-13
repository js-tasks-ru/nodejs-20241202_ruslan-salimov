import {ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus} from "@nestjs/common";
import { Response } from 'express';
import {appendFileSync} from 'fs';
@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const message = exception.message;
    const date = new Date().toISOString();
    let response = host.switchToHttp().getResponse<Response>();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
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
