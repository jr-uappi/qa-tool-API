import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { AuthModule } from "./auth/auth.module"
import { UsersModule } from "./users/users.module" // Vamos criar este módulo em breve
import { ProjectsModule } from "./projects/projects.module"
import { TestSuitesModule } from "./test-suites/test-suites.module"
import { TestCasesModule } from "./test-cases/test-cases.module"
import { CommentsModule } from "./comments/comments.module"
import { TestRunsModule } from "./test-runs/test-runs.module"
import { AutomatedTestResultsModule } from "./automated-test-results/automated-test-results.module"
import { ActivityLogsModule } from "./activity-logs/activity-logs.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Torna as variáveis de ambiente acessíveis globalmente
    }),
    AuthModule,
    UsersModule, // Importar o módulo de usuários
    ProjectsModule, // Novo
    TestSuitesModule, // Novo
    TestCasesModule, // Novo
    CommentsModule, // Novo
    TestRunsModule, // Novo
    AutomatedTestResultsModule, // Novo
    ActivityLogsModule, // Novo
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
