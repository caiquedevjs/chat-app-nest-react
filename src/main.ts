import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as path from 'path';
import { existsSync, mkdirSync } from 'fs';
import { ServeStaticModule } from '@nestjs/serve-static';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // URL do seu cliente React
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type'],
    credentials: true,
  });
  
  // Verifica se a pasta 'uploads' existe, caso contrário cria
  const uploadsDir = path.join(__dirname, '..', 'uploads');
  if (!existsSync(uploadsDir)) {
    mkdirSync(uploadsDir);
  }

  

  await app.listen(3333);
}
bootstrap();
