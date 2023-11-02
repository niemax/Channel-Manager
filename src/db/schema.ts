import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const channels = sqliteTable("channels", {
  id: integer("id").primaryKey(),
  name: text("name"),
  visible: integer("visible"),
})
