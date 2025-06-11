import { Controller, Get, UseGuards } from "@nestjs/common"
import { JwtAuthGuard } from "./jwt-auth.guard"
import { RolesGuard } from "./roles.guard"
import { Roles } from "./roles.decorator"

@Controller("auth")
export class AuthController {
  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(req) {
    // req.user contém o perfil do usuário validado pelo JwtStrategy
    return req.user
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin") // Apenas admins podem acessar esta rota
  @Get("admin-data")
  getAdminData(req) {
    return { message: "This is sensitive admin data!", user: req.user }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("qa-lead", "admin") // QA Leads e Admins podem acessar
  @Get("qa-lead-data")
  getQaLeadData(req) {
    return { message: "This is QA Lead specific data!", user: req.user }
  }
}
