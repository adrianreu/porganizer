<template>
  <q-page>
    <div class="q-pa-lg text-grey-7 text-weight-medium">Todos</div>
    <q-list separator v-if="todos.length > 0">
      <todo-preview-row
        v-for="todo in todos"
        :key="todo.id"
        :show-checkbox="true"
        :model-value="todo.completed"
        :text="todo.name"
        :daily="todo.repeatable"
        @update:model-value="todoStore.toggleCompletion(todo.id)"
        @click="router.push(`/todos/${todo.id}`)"
      />
    </q-list>
    <div class="q-pa-lg">
      <q-btn
        icon="mdi-plus"
        class="full-width"
        outline
        color="grey-9"
        square
        unelevated
        to="/todos/new"
      >
        Create todo
      </q-btn>
    </div>
  </q-page>

</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import TodoPreviewRow from 'src/components/TodoPreviewRow.vue';
import { useTodoStore } from 'src/stores/todoStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const todoStore = useTodoStore();

const { todos } = storeToRefs(todoStore);
</script>
