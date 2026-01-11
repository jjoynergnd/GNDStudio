import { db } from "./client";
import { projects, tasks } from "./schema";

async function main() {
  const [project] = await db
    .insert(projects)
    .values({ name: "Sample Project" })
    .returning();

  await db.insert(tasks).values([
    {
      projectId: project.id,
      name: "Design Homepage",
      status: "NOT_STARTED",
      order: 0,
      level: 0,
    },
    {
      projectId: project.id,
      name: "Build API",
      status: "IN_PROGRESS",
      order: 1,
      level: 0,
    },
  ]);

  console.log("Seed complete");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});