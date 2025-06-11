import { Module } from "@nestjs/common"
import { ActivityLogsService } from "./activity-logs.service"
import { ActivityLogsController } from "./activity-logs.controller"
import { AuthModule } from "../auth/auth.module"

@Module({
  imports: [AuthModule],
  providers: [ActivityLogsService],
  controllers: [ActivityLogsController],
  exports: [ActivityLogsService],
})
export class ActivityLogsModule {}
