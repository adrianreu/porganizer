import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { date } from 'quasar';
import { flatOutDate } from 'src/utils/dateUtils';

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
      const today = date.adjustDate(new Date(), {
        hours: 0, minutes: 0, seconds: 0, milliseconds: 0,
      });
      todo.completedAt = todo.completed ? today : null;
    }
  }

  function cleanUp() {
    const today = flatOutDate(new Date());
    const todosToFilterOut: number[] = [];
    // reset todo if it is repeatable and completed not today
    todos.value.forEach((todo) => {
      const completedAt = flatOutDate(new Date(todo.completedAt || ''));
      const diff = date.getDateDiff(today, completedAt, 'days');
      if (todo.repeatable && todo.completedAt && diff > 0) {
        todo.completed = false;
        todo.completedAt = null;
      }
      if (!todo.repeatable && todo.completed && diff > 0) {
        todosToFilterOut.push(todo.id);
      }
    });

    todos.value = todos.value.filter((todo) => !todosToFilterOut.includes(todo.id));
  }

  return {
    todos,
    addTodo,
    deleteTodo,
    toggleCompletion,
    cleanUp,
  };
});
