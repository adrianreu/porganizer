<template>
<q-page>
  <div class="q-pa-md">
    <div class="text-h4 q-mb-xl">
      <q-icon
        name="mdi-square-circle"
        size="lg"
        class="q-mr-sm"
      ></q-icon>Porganizer
    </div>
    <div class="text-caption text-grey-7 col">Come your goals a little closer today.</div>
  </div>
  <q-list separator v-if="dailyProjectTasks.length">
    <preview-row
      v-for="dailyProjectTask in dailyProjectTasks"
      :key="dailyProjectTask.id"
      show-checkbox
      v-model="dailyProjectTask.completed"
      :text="dailyProjectTask.name"
      :priority="dailyProjectTask.priority"
      show-badge
      :badge-color="dailyProjectTask.projectColor"
      :badge-text="dailyProjectTask.projectName"
      :badge-priority="dailyProjectTask.projectPriority"
      :project-id="dailyProjectTask.projectId"
      @click="
        router.push(`/projects/${dailyProjectTask.projectId}/tasks/${dailyProjectTask.id}`)
        "
        @update:model-value="projectStore.toggleTaskCompletion(
          dailyProjectTask.projectId,
          dailyProjectTask.id,
        )"
    />
  </q-list>
  <div class="q-pa-md" v-else>
    <q-btn
      icon="mdi-plus"
      class="full-width"
      unelevated
      to="/projects/new"
      outline
      color="grey-9"
      square
    >
      Create your first project
    </q-btn>
  </div>
  <div class="text-caption text-grey-7 col q-pa-md">Your general todos</div>
  <q-list seperator v-if="todos.length">
    <todo-preview-row
      v-for="todo in todos"
      :key="todo.id"
      :show-checkbox="true"
      :model-value="todo.completed"
      :text="todo.name"
      :daily="todo.repeatable"
      @click="router.push(`/todos/${todo.id}`)"
      @update:model-value="todoStore.toggleCompletion(todo.id)"
    />
  </q-list>
</q-page>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import PreviewRow from 'src/components/PreviewRow.vue';
import TodoPreviewRow from 'src/components/TodoPreviewRow.vue';
import { useProjectStore } from 'src/stores/projectStore';
import { useTodoStore } from 'src/stores/todoStore';
import { useRouter } from 'vue-router';

const router = useRouter();

const projectStore = useProjectStore();
const todoStore = useTodoStore();
const { dailyProjectTasks } = storeToRefs(projectStore);
const { todos } = storeToRefs(todoStore);
</script>
