import { Module } from "@nestjs/common"
import { ProjectsService } from "./projects.service"
import { ProjectsController } from "./projects.controller"
import { AuthModule } from "../auth/auth.module" // Para SupabaseService

@Module({
  imports: [AuthModule],
  providers: [ProjectsService],
  controllers: [ProjectsController],
  exports: [ProjectsService], // Exportar se outros módulos precisarem
})
export class ProjectsModule {}
