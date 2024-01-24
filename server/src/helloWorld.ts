import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import * as trpcExpress from '@trpc/server/adapters/express';

export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({});

type Context = Awaited<ReturnType<typeof createContext>>;

export const t = initTRPC.create();

export const appRouter = t.router({
  // Create procedure at path 'greeting'

  greeting: t.procedure.query(() => {
    const data = { status: 200, name: 'chat' };
    return data;
  }),

  updateGreeting: t.procedure
    .input(z.object({ name: z.string() }))
    .query(async (opts) => {
      // Lógica para processar o nome, por exemplo, gerar uma mensagem de saudação
      const greeting = `Olá, ${opts.input.name}!`;
      return greeting;
    }),
});

export type AppRouter = typeof appRouter;
