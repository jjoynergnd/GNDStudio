// src/db/schema.ts
import {
  pgTable,
  text,
  varchar,
  uuid,
  timestamp,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// TaskStatus enum
export const taskStatusEnum = pgEnum("task_status", [
  "NOT_STARTED",
  "IN_PROGRESS",
  "COMPLETE",
  "BLOCKED",
]);

export const projects = pgTable("projects", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  color: varchar("color", { length: 32 }),
  icon: varchar("icon", { length: 64 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const tasks = pgTable("tasks", {
  id: uuid("id").defaultRandom().primaryKey(),

  projectId: uuid("project_id").notNull(),

  // parentId is just a column here — FK comes later via relations()
  parentId: uuid("parent_id"),

  order: integer("order").notNull(),
  level: integer("level").notNull(),
  name: text("name").notNull(),
  assignee: text("assignee"),
  status: taskStatusEnum("status").default("NOT_STARTED").notNull(),
  due: timestamp("due"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Relations — this is where FKs are defined safely
export const taskRelations = relations(tasks, ({ one }) => ({
  project: one(projects, {
    fields: [tasks.projectId],
    references: [projects.id],
  }),
  parent: one(tasks, {
    fields: [tasks.parentId],
    references: [tasks.id],
  }),
}));

// ------------------------------------------------------
// ⭐ Inferred Types (add these at the bottom)
// ------------------------------------------------------

export type Project = typeof projects.$inferSelect;
export type Task = typeof tasks.$inferSelect;
