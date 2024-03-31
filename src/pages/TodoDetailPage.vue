<template>
  <q-page class="q-pa-md">
    <div class="column q-gutter-md">
      <div class="text-h5">To-Do</div>
      <q-input
        v-model="todo.name"
        placeholder="Name"
        outlined
        dense
      />
      <q-input
        v-model="todo.description"
        type="textarea"
        placeholder="Description"
        outlined
        dense
      />
      <q-checkbox
        v-model="todo.repeatable"
        label="Daily"
        color="grey-10"
        dense
      />
      <q-checkbox
        :model-value="todo.completed"
        label="Completed"
        color="grey-10"
        dense
        @update:model-value="todoStore.toggleCompletion(todo.id)"
      />
    </div>
    <q-footer class="bg-white q-pa-md" bordered style="backdrop-filter: blur(6px)">
      <div class="row justify-between q-col-gutter-md">
        <div class="col-shrink">
          <q-btn
            round
            icon="mdi-arrow-left"
            flat
            color="black"
            dense
            @click="router.go(-1)"
          ></q-btn>
        </div>
        <div class="col-grow">
          <q-btn
            class="full-width"
            outline
            color="grey-9"
            square
            unelevated
            @click="save"
          >Save</q-btn>
        </div>
        <div class="col-shrink" v-if="todoId !== 'new'">
          <q-btn
            round
            icon="mdi-delete"
            flat
            color="red-10"
            dense
            @click="deleteTodo"
          ></q-btn>
        </div>
      </div>
    </q-footer>
  </q-page>
  </template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { Todo, useTodoStore } from 'src/stores/todoStore';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const todoStore = useTodoStore();

const { todos } = storeToRefs(todoStore);

const todo = ref<Todo>({
  id: -1,
  name: '',
  description: '',
  completed: false,
  completedAt: null,
  repeatable: false,
});

const todoId = computed(() => route.params.id);

function save() {
  if (todoId.value && todoId.value === 'new') {
    todoStore.addTodo(todo.value);
  }
}

function deleteTodo() {
  if (todoId.value && todoId.value !== 'new') {
    todoStore.deleteTodo(Number.parseInt(todoId.value.toString(), 10));
  }
}

onMounted(() => {
  if (todoId.value && todoId.value === 'new') {
    todo.value = {
      id: -1,
      name: '',
      description: '',
      completed: false,
      completedAt: null,
      repeatable: false,
    };
  } else {
    const todoIdParsed = Number.parseInt(todoId.value.toString(), 10);
    const todoFromStore = todos.value.find((t) => t.id === todoIdParsed);
    if (todoFromStore) {
      todo.value = todoFromStore;
    } else {
      router.replace('/todos/new');
    }
  }
});
</script>
