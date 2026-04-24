import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const messages = pgTable("messages", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const adminLogs = pgTable("admin_logs", {
    id: serial("id").primaryKey(),
    action: varchar("action", { length: 255 }).notNull(),
    details: text("details"),
    ip: varchar("ip", { length: 50 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});
