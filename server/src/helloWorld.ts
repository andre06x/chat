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
  greeting: t.procedure.query((opts) => `Hello 123`),

  updateGreeting: t.procedure
    .input(z.object({ newName: z.string() }))
    .mutation(async (opts) => {
      // Lógica de mutação aqui, como atualizar o nome
      return `Name updated to ${opts.input.newName}`;
    }),
});

export type AppRouter = typeof appRouter;
