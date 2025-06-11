import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ValidationPipe } from "@nestjs/common"
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Habilitar CORS para o frontend Next.js
  app.enableCors({
    origin: "http://localhost:3000", // Altere para o domínio do frontend em produção
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })

  // Habilitar validação global de DTOs
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }))

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle("QA Tool API")
    .setDescription("API documentation for the QA Tool application")
    .setVersion("1.0")
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api", app, document)

  // Rodar no host acessível externamente (obrigatório no Render)
  await app.listen(process.env.PORT || 3001, '0.0.0.0')
  console.log(`NestJS application is running on: ${await app.getUrl()}`)
}
bootstrap()
