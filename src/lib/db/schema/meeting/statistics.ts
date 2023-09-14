import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { meeting } from "../meeting";
import { relations } from "drizzle-orm";

export const statistics = pgTable("statistics", {
  id: serial("id").primaryKey(),
  image: text("image"),
  timeStamp: timestamp("startTime", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
  sentiment: text("sentiment").notNull(),
  meetingId: serial("meetingId")
    .notNull()
    .references(() => meeting.id, { onDelete: "cascade" }),
});

export const statisticsMeetingRelation = relations(statistics, ({ one }) => ({
  meeting: one(meeting, {
    fields: [statistics.meetingId],
    references: [meeting.id],
  }),
}));
