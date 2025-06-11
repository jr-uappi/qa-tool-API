import { Module } from "@nestjs/common"
import { AutomatedTestResultsService } from "./automated-test-results.service"
import { AutomatedTestResultsController } from "./automated-test-results.controller"
import { AuthModule } from "../auth/auth.module"

@Module({
  imports: [AuthModule],
  providers: [AutomatedTestResultsService],
  controllers: [AutomatedTestResultsController],
  exports: [AutomatedTestResultsService],
})
export class AutomatedTestResultsModule {}
