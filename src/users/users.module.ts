import { Module } from "@nestjs/common"
import { UsersService } from "./users.service"
import { UsersController } from "./users.controller"
import { AuthModule } from "../auth/auth.module" // Importar AuthModule para usar SupabaseService

@Module({
  imports: [AuthModule], // Importar AuthModule para ter acesso ao SupabaseService
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
