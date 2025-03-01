import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000', //💡  Ou '*' para liberar tudo (cuidado em produção)
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], //💡 Adicione Authorization aqui
    credentials: true, // 💡 Se estiver usando cookies ou autenticação
  });

  await app.listen(3334);
}
bootstrap();
