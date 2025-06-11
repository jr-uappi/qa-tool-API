import { Injectable, UnauthorizedException } from "@nestjs/common"
import { SupabaseService } from "./supabase.service"
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class AuthService {
  constructor(
    private supabaseService: SupabaseService,
    private jwtService: JwtService,
  ) {}

  async validateUser(payload: any): Promise<any> {
    // O payload já vem decodificado pelo JwtStrategy
    // Aqui você pode fazer validações adicionais, como buscar o usuário no banco de dados
    // para garantir que ele ainda existe e está ativo.
    const { data: profile, error } = await this.supabaseService.supabase
      .from("profiles")
      .select("id, name, email, role")
      .eq("id", payload.sub) // 'sub' é o ID do usuário no JWT do Supabase
      .single()

    if (error || !profile) {
      throw new UnauthorizedException("User not found or invalid token.")
    }

    // Retorna o perfil do usuário, que será anexado ao objeto request
    return profile
  }
}
