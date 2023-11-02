import { createTRPCReact } from "@trpc/react-query"

import { type AppRouter } from "@/server"

// create the trpc client with the generated router

export const trpc = createTRPCReact<AppRouter>({})
