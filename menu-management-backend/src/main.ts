import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClient } from '@prisma/client';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // Allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3002);
  const prisma = new PrismaClient();

  // Run the seed data if needed
  const menuCount = await prisma.menu.count();
  if (menuCount === 0) {
    await import('../prisma/seed');
  }
}
bootstrap();
