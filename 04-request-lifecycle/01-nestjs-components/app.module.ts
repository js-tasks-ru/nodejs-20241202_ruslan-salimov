import {MiddlewareConsumer, Module, NestModule} from "@nestjs/common";
import { TasksModule } from "./tasks/tasks.module";
import {LoggingMiddleware} from "./middlewares/logging.middleware";

@Module({
  imports: [TasksModule],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggingMiddleware).forRoutes('tasks');
  }
}
