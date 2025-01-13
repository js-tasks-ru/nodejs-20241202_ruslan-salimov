import { NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import {map} from "rxjs";

export class ApiVersionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const start = Date.now();
    return next.handle().pipe(
        map((response) => ({
          ...response,
          apiVersion: '1.0',
          executionTime: `${Date.now() - start}ms`
        })),
    );
  }
}
