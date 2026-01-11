import type { Task } from '@prisma/client'

export type TaskWithRelations = Task

export type TaskTreeNode = TaskWithRelations & {
  children: TaskTreeNode[]
}

/**
 * Build a tree from a flat list of tasks.
 */
export function buildTaskTree(tasks: TaskWithRelations[]): TaskTreeNode[] {
  const byId = new Map<string, TaskTreeNode>()
  const roots: TaskTreeNode[] = []

  const sorted = [...tasks].sort((a, b) => a.order - b.order)

  for (const task of sorted) {
    byId.set(task.id, { ...task, children: [] })
  }

  for (const node of byId.values()) {
    if (node.parentId) {
      const parent = byId.get(node.parentId)
      if (parent) {
        parent.children.push(node)
      } else {
        roots.push(node)
      }
    } else {
      roots.push(node)
    }
  }

  return roots
}

/**
 * Normalize order values to 10, 20, 30...
 */
export function normalizeOrder(tasks: TaskWithRelations[]): TaskWithRelations[] {
  const sorted = [...tasks].sort((a, b) => a.order - b.order)
  return sorted.map((task, index) => ({
    ...task,
    order: (index + 1) * 10,
  }))
}

/**
 * Get the next order value.
 */
export function getNextOrder(tasks: TaskWithRelations[]): number {
  if (!tasks.length) return 10
  const maxOrder = Math.max(...tasks.map((t) => t.order))
  return maxOrder + 10
}

/**
 * Compute WBS numbers (1, 1.2, 1.2.3).
 */
export function computeWbsNumbers(tasks: TaskWithRelations[]): Map<string, string> {
  const sorted = [...tasks].sort((a, b) => a.order - b.order)
  const stack: number[] = []
  const wbs = new Map<string, string>()

  for (const task of sorted) {
    const level = task.level ?? 0

    while (stack.length > level + 1) stack.pop()
    while (stack.length < level + 1) stack.push(0)

    stack[stack.length - 1] += 1
    const label = stack.join('.')
    wbs.set(task.id, label)
  }

  return wbs
}

/**
 * Compute indent (make previous sibling the parent).
 */
export function computeIndent(
  tasks: TaskWithRelations[],
  taskId: string,
): { parentId: string | null; level: number } | null {
  const sorted = [...tasks].sort((a, b) => a.order - b.order)
  const index = sorted.findIndex((t) => t.id === taskId)
  if (index <= 0) return null

  const task = sorted[index]
  const prev = sorted[index - 1]

  if (!task || !prev) return null

  return {
    parentId: prev.id,
    level: (prev.level ?? 0) + 1,
  }
}

/**
 * Compute outdent (move up one level).
 */
export function computeOutdent(
  tasks: TaskWithRelations[],
  taskId: string,
): { parentId: string | null; level: number } | null {
  const task = tasks.find((t) => t.id === taskId)
  if (!task) return null

  const currentLevel = task.level ?? 0
  if (currentLevel <= 0) return null

  const parent = tasks.find((t) => t.id === task.parentId)

  return {
    parentId: parent?.parentId ?? null,
    level: currentLevel - 1,
  }
}

/**
 * Reorder tasks in memory.
 */
export function reorderTasksInMemory(
  tasks: TaskWithRelations[],
  taskId: string,
  targetIndex: number,
): TaskWithRelations[] {
  const sorted = [...tasks].sort((a, b) => a.order - b.order)
  const currentIndex = sorted.findIndex((t) => t.id === taskId)
  if (currentIndex === -1) return tasks

  const [removed] = sorted.splice(currentIndex, 1)
  const clampedIndex = Math.max(0, Math.min(targetIndex, sorted.length))
  sorted.splice(clampedIndex, 0, removed)

  return normalizeOrder(sorted)
}
