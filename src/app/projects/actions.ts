"use server";

import { db, projects, tasks } from "@/db";
import { eq } from "drizzle-orm";

// ---------------------------------------------------------
// Create a new project
// ---------------------------------------------------------
export async function createProject(input?: {
  name?: string;
  description?: string | null;
  color?: string | null;
  icon?: string | null;
}) {
  const [project] = await db
    .insert(projects)
    .values({
      name: input?.name ?? "Untitled project",
      description: input?.description ?? null,
      color: input?.color ?? null,
      icon: input?.icon ?? null,
    })
    .returning();

  return project;
}

// ---------------------------------------------------------
// Create a project + first task
// ---------------------------------------------------------
export async function createProjectWithInitialTask() {
  const project = await createProject();

  const [task] = await db
    .insert(tasks)
    .values({
      projectId: project.id,
      name: "",
      order: 10,
      level: 0,
      status: "NOT_STARTED",
    })
    .returning();

  return {
    project,
    tasks: [task],
  };
}

// ---------------------------------------------------------
// Fetch project + tasks
// ---------------------------------------------------------
export async function getProjectWithTasks(projectId: string) {
  const [project] = await db
    .select()
    .from(projects)
    .where(eq(projects.id, projectId));

  if (!project) return null;

  const projectTasks = await db
    .select()
    .from(tasks)
    .where(eq(tasks.projectId, projectId))
    .orderBy(tasks.order);

  return {
    ...project,
    tasks: projectTasks,
  };
}

// ---------------------------------------------------------
// Create a task
// ---------------------------------------------------------
export async function createTask(input: {
  projectId: string;
  name?: string;
  parentId?: string | null;
  level?: number;
  order?: number;
}) {
  const [task] = await db
    .insert(tasks)
    .values({
      projectId: input.projectId,
      name: input.name ?? "",
      parentId: input.parentId ?? null,
      level: input.level ?? 0,
      order: input.order ?? 10,
      status: "NOT_STARTED",
    })
    .returning();

  return task;
}

// ---------------------------------------------------------
// Update a task
// ---------------------------------------------------------
export async function updateTask(input: {
  id: string;
  name?: string;
  assignee?: string | null;
  status?: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETE" | "BLOCKED";
  due?: Date | null;
  notes?: string | null;
}) {
  const data: Record<string, unknown> = {};

  if (input.name !== undefined) data.name = input.name;
  if (input.assignee !== undefined) data.assignee = input.assignee;
  if (input.status !== undefined) data.status = input.status;
  if (input.due !== undefined) data.due = input.due;
  if (input.notes !== undefined) data.notes = input.notes;

  if (Object.keys(data).length === 0) return null;

  const [updated] = await db
    .update(tasks)
    .set(data)
    .where(eq(tasks.id, input.id))
    .returning();

  return updated;
}

// ---------------------------------------------------------
// Update project name (needed by EditableProjectTitle)
// ---------------------------------------------------------
export async function updateProjectName(projectId: string, name: string) {
  const [updated] = await db
    .update(projects)
    .set({ name })
    .where(eq(projects.id, projectId))
    .returning();

  return updated;
}
