import { eq } from "drizzle-orm"
import { drizzle } from "drizzle-orm/better-sqlite3"
import { migrate } from "drizzle-orm/better-sqlite3/migrator"
import Database from "better-sqlite3"
import { z } from "zod"

import { publicProcedure, router } from "./trpc"

import { channels, hotels, hotelChannels } from "@/db/schema"

const betterSqlite = new Database("sqlite.db")
const db = drizzle(betterSqlite)

migrate(db, { migrationsFolder: "drizzle" })

async function seedData() {
  const hotelNames = ["Hotel A", "Hotel B", "Hotel C", "Hotel D", "Hotel E"]
  const hotelsCount = await db.select().from(hotels).all().length
  if (!hotelsCount) {
    for (let i = 0; i < hotelNames.length; i++) {
      await db.insert(hotels).values({ name: hotelNames[i] })
    }
  }

  const channelsCount = await db.select().from(channels).all().length

  if (!channelsCount) {
    for (let i = 1; i <= 100; i++) {
      await db.insert(channels).values({ name: `Channel ${i}` })
    }
  }

  const hotelChannelsCount = await db.select().from(hotelChannels).all().length
  if (!hotelChannelsCount) {
    const allHotels = await db.select().from(hotels).all()
    const allChannels = await db.select().from(channels).all()
    for (let hotel of allHotels) {
      for (let channel of allChannels) {
        await db.insert(hotelChannels).values({
          hotelId: hotel.id,
          channelId: channel.id,
          visible: 0,
        })
      }
    }
  }
}

async function deleteAllData() {
  await db.delete(hotelChannels).run()
  await db.delete(channels).run()
  await db.delete(hotels).run()
}
//deleteAllData()

seedData().catch((error) => console.error("Failed to seed data:", error))

export const appRouter = router({
  getHotels: publicProcedure.query(async () => {
    return await db.select().from(hotels).all()
  }),
  getChannels: publicProcedure.query(async () => {
    return await db.select().from(channels).all()
  }),
  getHotelChannels: publicProcedure.input(z.number()).query(async (opts) => {
    const { input } = opts

    const fetchedHotelChannels = await db
      .select()
      .from(hotelChannels)
      .where(eq(hotelChannels.hotelId, input))
      .all()

    const fetchedChannels = []
    for (let hc of fetchedHotelChannels) {
      const channel = await db
        .select()
        .from(channels)
        .where(eq(channels.id, hc.channelId))

      if (channel) {
        fetchedChannels.push({ ...channel, visible: hc.visible })
      }
    }

    return fetchedChannels
  }),
  /*   changeHotelChannelVisibility: publicProcedure
    .input(
      z.object({
        hotelId: z.number(),
        channelId: z.number(),
        visible: z.number(),
      })
    )
    .mutation(async (opts) => {
      await db
        .update(hotelChannels)
        .set({ visible: opts.input.visible })
        .where({
          hotelId: opts.input.hotelId,
          channelId: opts.input.channelId,
        })
        .run()
      return true
    }), */
  /*   addChannel: publicProcedure.input(z.string()).mutation(async (opts) => {
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
    }), */
})

export type AppRouter = typeof appRouter
