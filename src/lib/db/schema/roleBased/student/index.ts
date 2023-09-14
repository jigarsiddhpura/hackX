import { integer, pgTable, serial } from "drizzle-orm/pg-core";
import { users } from "../../users";

export const student = pgTable("student", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});
