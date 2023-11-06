import { and, eq, gt, like } from "drizzle-orm"
import { drizzle } from "drizzle-orm/better-sqlite3"
import { migrate } from "drizzle-orm/better-sqlite3/migrator"
import Database from "better-sqlite3"
import { z } from "zod"

import { publicProcedure, router } from "./trpc"

import { channels, hotels, hotelChannels } from "@/db/schema"

const betterSqlite = new Database(
  process.env.NODE_ENV === "test" ? "test.db" : "sqlite.db"
)
export const db = drizzle(betterSqlite)

migrate(db, { migrationsFolder: "drizzle" })

export async function seedData() {
  console.log("populating data...")
  const hotelsCount = await db.select().from(hotels).all().length
  if (!hotelsCount) {
    for (let i = 1; i <= 100; i++) {
      try {
        await db.insert(hotels).values({ name: `Hotel ${i}` })
      } catch (error) {
        console.error(error)
        throw error
      }
    }
  }

  const channelsCount = await db.select().from(channels).all().length

  if (!channelsCount) {
    for (let i = 1; i <= 100; i++) {
      try {
        await db.insert(channels).values({ name: `Channel ${i}` })
      } catch (error) {
        console.error(error)
        throw error
      }
    }
  }

  const hotelChannelsCount = await db.select().from(hotelChannels).all().length
  if (!hotelChannelsCount) {
    const allHotels = await db.select().from(hotels).all()
    const allChannels = await db.select().from(channels).all()
    for (let hotel of allHotels) {
      for (let channel of allChannels) {
        try {
          await db.insert(hotelChannels).values({
            hotelId: hotel.id,
            channelId: channel.id,
            channelName: channel.name,
            visible: 0,
          })
        } catch (error) {
          console.error(error)
          throw error
        }
      }
    }
  }
}

export async function deleteAllData() {
  console.log("deleting all data")
  try {
    await db.delete(hotelChannels).run()
    await db.delete(hotels).run()
    await db.delete(channels).run()
  } catch (error) {
    console.error(error)
  }
}

//deleteAllData().catch((error) => console.error("Failed to delete data:", error))

seedData().catch((error) => console.error("Failed to seed data:", error))

// PROCEDURES
const getHotelChannelsProcedure = publicProcedure
  .input(
    z.object({
      hotelId: z.number(),
      limit: z.number().optional().default(10),
      cursor: z.number().optional(),
    })
  )
  .query(async ({ input }) => {
    try {
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
    } catch (error) {
      console.error("Failed to get hotel channels:", error)
      throw error
    }
  })

const changeHotelChannelVisibilityProcedure = publicProcedure
  .input(
    z.object({
      hotelId: z.number(),
      channelId: z.number(),
      visible: z.number(),
    })
  )
  .mutation(async ({ input }) => {
    try {
      await db
        .update(hotelChannels)
        .set({ visible: input.visible })
        .where(
          and(
            eq(hotelChannels.hotelId, input.hotelId),
            eq(hotelChannels.channelId, input.channelId)
          )
        )
        .run()
      return true
    } catch (error) {
      console.error("Failed to change hotel channel visibility:", error)
      throw error
    }
  })

const checkVisibilityOfHotelOnChannelProcedure = publicProcedure
  .input(
    z.object({
      hotelId: z.number(),
      channelName: z.string(),
    })
  )
  .query(async ({ input }) => {
    const channelToLowerCase = input.channelName.toLowerCase()

    try {
      return await db
        .select()
        .from(hotelChannels)
        .where(
          and(
            eq(hotelChannels.hotelId, input.hotelId),
            eq(like(hotelChannels.channelName, channelToLowerCase), 1)
          )
        )
        .all()
    } catch (error) {
      console.error("Failed to check visibility of hotel on channel:", error)
      throw error
    }
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
  checkVisibilityOfHotelOnChannel: checkVisibilityOfHotelOnChannelProcedure,
})

export type AppRouter = typeof appRouter
