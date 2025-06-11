import { Module } from "@nestjs/common"
import { TestRunsService } from "./test-runs.service"
import { TestRunsController } from "./test-runs.controller"
import { AuthModule } from "../auth/auth.module"

@Module({
  imports: [AuthModule],
  providers: [TestRunsService],
  controllers: [TestRunsController],
  exports: [TestRunsService],
})
export class TestRunsModule {}
