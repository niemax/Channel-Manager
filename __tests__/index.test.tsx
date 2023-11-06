import "@testing-library/jest-dom"
import { appRouter, db } from "@/server"
import { and, eq } from "drizzle-orm"
import { hotelChannels } from "@/db/schema"

// DATABASE TESTS
const caller = appRouter.createCaller({ session: null, req: null, res: null })
const HOTELS_LENGTH = 100,
  CHANNELS_LENGTH = 100,
  HOTEL_CHANNELS_LENGTH = 10,
  HOTEL_CHANNELS_CURSOR = 10

test("getHotels returns all hotels", async () => {
  const hotels = await caller.getHotels()
  expect(hotels).toHaveLength(HOTELS_LENGTH)
})

test("getChannels returns all channels", async () => {
  const channels = await caller.getChannels()
  expect(channels).toHaveLength(CHANNELS_LENGTH)
})

test("getHotelChannels returns channels for a hotel", async () => {
  const hotelChannels = await caller.getHotelChannels({
    hotelId: 1,
    limit: 10,
  })
  expect(hotelChannels.data).toHaveLength(HOTEL_CHANNELS_LENGTH)
  expect(hotelChannels.cursor).toBe(HOTEL_CHANNELS_CURSOR)
})

test("changeHotelChannelVisibility and checkVisibilityOfHotelOnChannel", async () => {
  await caller.changeHotelChannelVisibility({
    hotelId: 1,
    channelId: 1,
    visible: 1,
  })

  await db
    .select()
    .from(hotelChannels)
    .where(and(eq(hotelChannels.hotelId, 1), eq(hotelChannels.channelId, 1)))

  const visibility = await caller.checkVisibilityOfHotelOnChannel({
    hotelId: 1,
    channelName: "Channel 1",
  })
  expect(visibility[0].visible).toBe(1)
})

// UI TESTS
