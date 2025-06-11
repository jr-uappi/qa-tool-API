import { Injectable, type CanActivate, type ExecutionContext } from "@nestjs/common"
import type { Reflector } from "@nestjs/core"
import { ROLES_KEY } from "./roles.decorator"
import type { Role } from "../types/auth" // Importar a interface Role do seu frontend

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (!requiredRoles) {
      return true // Se nenhuma role for especificada, a rota é acessível
    }
    const { user } = context.switchToHttp().getRequest()
    // Verifica se o usuário tem alguma das roles necessárias
    return requiredRoles.some((role) => user.role?.includes(role))
  }
}
