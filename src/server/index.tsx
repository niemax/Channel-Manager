import { eq } from "drizzle-orm"
import { drizzle } from "drizzle-orm/better-sqlite3"
import { migrate } from "drizzle-orm/better-sqlite3/migrator"
import Database from "better-sqlite3"
import { z } from "zod"

import { publicProcedure, router } from "./trpc"

import { channels } from "@/db/schema"

const betterSqlite = new Database("sqlite.db")
const db = drizzle(betterSqlite)

migrate(db, { migrationsFolder: "drizzle" })

async function seedData() {
  console.log("seeding data...")
  // Check if there are already 100 channels
  const channelsCount = (await db.select().from(channels).all()).length

  if (channelsCount < 100) {
    // If there are less than 100 channels, insert the missing ones
    const missingChannels = 100 - channelsCount

    for (let i = 0; i < missingChannels; i++) {
      await db
        .insert(channels)
        .values({ name: `Channel ${channelsCount + i + 1}`, visible: 0 })
        .run()
    }
  }
}

seedData().catch((error) => console.error("Failed to seed data:", error))

export const appRouter = router({
  getChannels: publicProcedure.query(async () => {
    return await db.select().from(channels).all()
  }),
  addChannel: publicProcedure.input(z.string()).mutation(async (opts) => {
    await db.insert(channels).values({ name: opts.input, visible: 0 }).run()
    return true
  }),
  changeVisibility: publicProcedure
    .input(
      z.object({
        id: z.number(),
        visible: z.number(),
      })
    )
    .mutation(async (opts) => {
      await db
        .update(channels)
        .set({ visible: opts.input.done })
        .where(eq(channels.id, opts.input.id))
        .run()
      return true
    }),
})

export type AppRouter = typeof appRouter
