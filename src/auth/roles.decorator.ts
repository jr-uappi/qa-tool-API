import { SetMetadata } from "@nestjs/common"
import type { Role } from "../types/auth" // Importar a interface Role do seu frontend

export const ROLES_KEY = "roles"
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles)
