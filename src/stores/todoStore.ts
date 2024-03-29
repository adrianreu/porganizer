import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { date } from 'quasar';

const TODO_STORE_KEY = 'todos';

export interface Todo {
  id: number;
  name: string;
  description: string;
  completed: boolean;
  completedAt: Date | null;
  repeatable: boolean;
}

export const useTodoStore = defineStore(TODO_STORE_KEY, () => {
  const todos = useStorage<Todo[]>(
    TODO_STORE_KEY,
    [],
    localStorage,
    { mergeDefaults: true },
  );

  function addTodo(todo: Todo) {
    // generate random id
    todo.id = Date.now();
    todos.value.push(todo);
  }

  function deleteTodo(id: number) {
    todos.value = todos.value.filter((todo) => todo.id !== id);
  }

  function toggleCompletion(id: number) {
    const todo = todos.value.find((todoX) => todoX.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      todo.completedAt = todo.completed ? new Date() : null;
    }
  }

  function cleanUp() {
    // reset todo if it is repeatable and completed not today
    todos.value.forEach((todo) => {
      const today = new Date();
      const diff = date.getDateDiff(today, todo.completedAt, 'days');
      if (todo.repeatable && todo.completedAt && diff > 1) {
        todo.completed = false;
        todo.completedAt = null;
      }
      if (!todo.repeatable && todo.completed && diff > 1) {
        todos.value = todos.value.filter((t) => t.id !== todo.id);
      }
    });
  }

  return {
    todos,
    addTodo,
    deleteTodo,
    toggleCompletion,
    cleanUp,
  };
});
