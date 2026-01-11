'use client'

import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from 'react'
import type { Project, Task } from '@prisma/client'
import { computeWbsNumbers, TaskWithRelations } from '@/lib/task'

type ProjectWithTasks = Project & {
  tasks: Task[]
}

type UpdateTaskInput = Partial<Pick<
  TaskWithRelations,
  'name' | 'status' | 'assignee' | 'due' | 'notes' | 'order'
>>

type ProjectContextValue = {
  project: Project
  tasks: TaskWithRelations[]
  wbsById: Map<string, string>
  updateTask: (taskId: string, updates: UpdateTaskInput) => void
}

const ProjectContext = createContext<ProjectContextValue | null>(null)

export function useProjectContext() {
  const ctx = useContext(ProjectContext)
  if (!ctx) {
    throw new Error('useProjectContext must be used within ProjectProvider')
  }
  return ctx
}

type Props = {
  initialData: ProjectWithTasks
  children: React.ReactNode
}

export function ProjectProvider({ initialData, children }: Props) {
  const [project] = useState<Project>(initialData)

  const [tasks, setTasks] = useState<TaskWithRelations[]>(
    [...initialData.tasks].sort((a, b) => a.order - b.order),
  )

  const updateTask = useCallback(
    (taskId: string, updates: UpdateTaskInput) => {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId ? { ...task, ...updates } : task,
        ),
      )
    },
    [],
  )

  const wbsById = useMemo(() => {
    return computeWbsNumbers(tasks)
  }, [tasks])

  const value: ProjectContextValue = {
    project,
    tasks,
    wbsById,
    updateTask,
  }

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  )
}
