import { Injectable, UnauthorizedException } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import type { ConfigService } from "@nestjs/config"
import type { AuthService } from "./auth.service"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Deixe o Passport lidar com a expiração do token
      secretOrKey: configService.get<string>("SUPABASE_JWT_SECRET"),
    })
  }

  async validate(payload: any) {
    // O payload é o token JWT decodificado.
    // O 'sub' (subject) no JWT do Supabase é o ID do usuário.
    const user = await this.authService.validateUser(payload)
    if (!user) {
      throw new UnauthorizedException()
    }
    return user // Este objeto será anexado a req.user
  }
}
