import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appRouter, createContext } from './helloWorld';
import * as trpcExpress from '@trpc/server/adapters/express';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    }),
  );
  app.useWebSocketAdapter(new IoAdapter(app));

  await app.listen(3000);
}
bootstrap();
