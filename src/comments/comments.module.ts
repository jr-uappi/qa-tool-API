import { Module } from "@nestjs/common"
import { CommentsService } from "./comments.service"
import { CommentsController } from "./comments.controller"
import { AuthModule } from "../auth/auth.module"

@Module({
  imports: [AuthModule],
  providers: [CommentsService],
  controllers: [CommentsController],
  exports: [CommentsService], // Exportar para ser usado por outros módulos
})
export class CommentsModule {}
