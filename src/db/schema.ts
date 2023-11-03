import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const hotels = sqliteTable("hotels", {
  id: integer("id").primaryKey(),
  name: text("name"),
})

export const channels = sqliteTable("channels", {
  id: integer("id").primaryKey(),
  name: text("name"),
})

export const hotelChannels = sqliteTable("hotel_channels", {
  hotelId: integer("hotel_id").references(() => hotels.id),
  channelId: integer("channel_id").references(() => channels.id),
  visible: integer("visible").default(0),
  channelName: text("channel_name"),
})
