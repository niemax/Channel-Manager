import { and, eq, gt } from "drizzle-orm"
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
          channelName: channel.name,
          visible: 0,
        })
      }
    }
  }
}

seedData().catch((error) => console.error("Failed to seed data:", error))

const getHotelChannelsProcedure = publicProcedure
  .input(
    z.object({
      hotelId: z.number(),
      limit: z.number().optional().default(10),
      cursor: z.number().optional(),
    })
  )
  .query(async (opts) => {
    const { input } = opts

    const fetchedHotelChannels = await db
      .select()
      .from(hotelChannels)
      .where((hotelChannels) => {
        if (input.cursor) {
          return and(
            eq(hotelChannels.hotelId, input.hotelId),
            gt(hotelChannels.channelId, input.cursor)
          )
        } else {
          return eq(hotelChannels.hotelId, input.hotelId)
        }
      })
      .limit(input.limit)
      .all()

    const cursor =
      fetchedHotelChannels[fetchedHotelChannels.length - 1]?.channelId

    return { data: fetchedHotelChannels, cursor }
  })

const changeHotelChannelVisibilityProcedure = publicProcedure
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
      .where(
        and(
          eq(hotelChannels.hotelId, opts.input.hotelId),
          eq(hotelChannels.channelId, opts.input.channelId)
        )
      )
      .run()
    return true
  })

export const appRouter = router({
  getHotels: publicProcedure.query(async () => {
    return await db.select().from(hotels).all()
  }),
  getChannels: publicProcedure.query(async () => {
    return await db.select().from(channels).all()
  }),
  getHotelChannels: getHotelChannelsProcedure,
  changeHotelChannelVisibility: changeHotelChannelVisibilityProcedure,
  checkVisibilityOfHotelOnChannel: publicProcedure
    .input(
      z.object({
        hotelId: z.number(),
        channelName: z.string(),
      })
    )
    .query(async (opts) => {
      const { input } = opts

      return await db
        .select()
        .from(hotelChannels)
        .where(
          and(
            eq(hotelChannels.hotelId, input.hotelId),
            eq(hotelChannels.channelName, input.channelName)
          )
        )
        .all()
    }),
})

export type AppRouter = typeof appRouter
