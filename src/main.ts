import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ValidationPipe } from "@nestjs/common"
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Habilitar CORS para o frontend Next.js
  app.enableCors({
    origin: "http://localhost:3000", // Ou a URL do seu frontend Next.js
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })

  // Habilitar validação global de DTOs
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // Automaticamente transforma payloads em instâncias de DTO
    whitelist: true, // Remove propriedades não definidas no DTO
    forbidNonWhitelisted: true, // Lança erro se houver propriedades não permitidas
  }))

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle("QA Tool API")
    .setDescription("API documentation for the QA Tool application")
    .setVersion("1.0")
    .addBearerAuth() // Adiciona suporte a JWT Bearer Token
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api", app, document) // Acessível em http://localhost:3001/api

  await app.listen(3001) // O backend NestJS rodará na porta 3001
  console.log(`NestJS application is running on: ${await app.getUrl()}`)
}
bootstrap()