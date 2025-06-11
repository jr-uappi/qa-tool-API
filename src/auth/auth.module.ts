import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { PassportModule } from "@nestjs/passport"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { AuthService } from "./auth.service"
import { JwtStrategy } from "./jwt.strategy"
import { AuthController } from "./auth.controller" // Para login/logout (opcional, Supabase já faz)
import { SupabaseService } from "./supabase.service" // Serviço para interagir com Supabase

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("SUPABASE_JWT_SECRET"),
        // Não definimos expiresIn aqui, pois o Supabase já gerencia a expiração do token
      }),
      inject: [ConfigService],
    }),
    ConfigModule, // Importar ConfigModule para usar ConfigService
  ],
  providers: [AuthService, JwtStrategy, SupabaseService],
  controllers: [AuthController],
  exports: [AuthService, JwtModule, PassportModule, SupabaseService], // Exportar para outros módulos usarem
})
export class AuthModule {}
