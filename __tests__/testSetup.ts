import { seedData, deleteAllData, db } from "@/server"
import { migrate } from "drizzle-orm/better-sqlite3/migrator"

beforeAll(async () => {
  migrate(db, { migrationsFolder: "drizzle" })
  await seedData().catch((err) => console.error(err))
})

afterAll(async () => {
  await deleteAllData().catch((err) => console.error(err))
})
