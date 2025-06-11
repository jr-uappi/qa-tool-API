import { Controller, Get, UseGuards, Patch, Param } from "@nestjs/common"
import { JwtAuthGuard } from "../auth/jwt-auth.guard"
import { RolesGuard } from "../auth/roles.guard"
import { Roles } from "../auth/roles.decorator"
import type { UsersService } from "./users.service"
import type { Role } from "../types/auth" // Importar Role

@UseGuards(JwtAuthGuard, RolesGuard) // Proteger todas as rotas neste controlador
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get("profiles")
  @Roles("admin", "qa-lead") // Apenas admins e QA Leads podem listar perfis
  async getAllProfiles() {
    return this.usersService.findAllProfiles()
  }

  @Patch(":id/role")
  @Roles("admin") // Apenas admins podem mudar roles
  async updateRole(@Param('id') userId: string, newRole: Role) {
    return this.usersService.updateProfileRole(userId, newRole)
  }
}
