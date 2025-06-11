import { Module } from "@nestjs/common"
import { TestCasesService } from "./test-cases.service"
import { TestCasesController } from "./test-cases.controller"
import { AuthModule } from "../auth/auth.module"
import { CommentsModule } from "../comments/comments.module" // Importar CommentsModule

@Module({
  imports: [AuthModule, CommentsModule], // Adicionar CommentsModule
  providers: [TestCasesService],
  controllers: [TestCasesController],
  exports: [TestCasesService],
})
export class TestCasesModule {}
