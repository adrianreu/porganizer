import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed } from 'vue';
import { date } from 'quasar';
import { flatOutDate } from 'src/utils/dateUtils';
import { Priority, Project, Task } from './interfaces';

const PROJECT_STORE_KEY = 'projects';

interface TaskWithProjectId extends Task {
  projectId: number;
  projectColor: string;
  projectName: string;
  projectPriority: Priority;
}

export const useProjectStore = defineStore(PROJECT_STORE_KEY, () => {
  const projects = useStorage<Project[]>(
    PROJECT_STORE_KEY,
    [],
    localStorage,
    { mergeDefaults: true },
  );

  const sortedProjectsByPriority = computed<Project[]>(
    // sort projects by priority in descending order and with tasks
    () => projects.value
      .toSorted((a, b) => b.priority - a.priority),
  );

  const dailyProjectTasks = computed<TaskWithProjectId[]>(() => {
    const importantProjects = projects.value
      .filter((project) => project.tasks.length > 0)
      .toSorted((a, b) => b.priority - a.priority)
      .slice(0, 3);
    // get important first task from each project which
    // is only completed today
    // completed in past will be ignored
    const today = flatOutDate(new Date());
    return importantProjects.flatMap((project) => {
      const foundTask = project.tasks
        .toSorted((a, b) => b.priority - a.priority)
        .find((task: Task) => {
          if (task.completedAt !== null) {
            const completedAt = flatOutDate(new Date(task.completedAt));
            const diff = date.getDateDiff(today, completedAt, 'days');
            if (diff < 0) {
              return false;
            }
          }
          return !task.precondition || project.tasks.some(
            (t) => t.id === task.precondition && t.completed,
          );
        });
      return foundTask ? [{
        ...foundTask,
        projectId: project.id,
        projectName: project.name,
        projectColor: project.color,
        projectPriority: project.priority,
      }] : [];
    }).sort((a, b) => b.priority - a.priority);
  });

  function getProjectById(id: number) {
    return projects.value.find((project) => project.id === id);
  }

  function addProject(project: Project) {
    // generate random id
    project.id = Date.now();
    projects.value.push(project);
  }

  function toggleTaskCompletion(projectId: number, taskId: number) {
    const project = getProjectById(projectId);
    if (!project) {
      throw new Error('Project not found');
    }
    const task = project.tasks.find((t) => t.id === taskId);
    if (!task) {
      throw new Error('Task not found');
    }
    task.completed = !task.completed;
    const today = date.adjustDate(new Date(), {
      hours: 0, minutes: 0, seconds: 0, milliseconds: 0,
    });
    task.completedAt = task.completed ? today : null;
  }

  function deleteProject(id: number) {
    projects.value = projects.value.filter((project) => project.id !== id);
  }

  function deleteTaskFromProject(projectId: number, taskId: number) {
    const project = getProjectById(projectId);
    if (!project) {
      throw new Error('Project not found');
    }
    project.tasks = project.tasks.filter((task) => task.id !== taskId);
  }

  function addTaskToProject(projectId: number, task: Task) {
    const project = getProjectById(projectId);
    if (!project) {
      throw new Error('Project not found');
    }
    // generate random id
    task.id = Date.now();
    project.tasks.push(task);
  }

  function getTaskById(projectId: number, taskId: number) {
    const project = getProjectById(projectId);
    if (!project) {
      throw new Error('Project not found');
    }
    return project.tasks.find((task) => task.id === taskId);
  }

  return {
    projects,
    sortedProjectsByPriority,
    dailyProjectTasks,
    addProject,
    getProjectById,
    addTaskToProject,
    getTaskById,
    deleteProject,
    toggleTaskCompletion,
    deleteTaskFromProject,
  };
});
