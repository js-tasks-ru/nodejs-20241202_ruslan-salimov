import { Module } from "@nestjs/common";
import { NotificationsService } from "./notifications.service";
import {UsersModule} from "../users/users.module";

@Module({
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
