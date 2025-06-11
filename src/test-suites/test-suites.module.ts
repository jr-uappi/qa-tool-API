import { Module } from "@nestjs/common"
import { TestSuitesService } from "./test-suites.service"
import { TestSuitesController } from "./test-suites.controller"
import { AuthModule } from "../auth/auth.module"

@Module({
  imports: [AuthModule],
  providers: [TestSuitesService],
  controllers: [TestSuitesController],
  exports: [TestSuitesService],
})
export class TestSuitesModule {}
