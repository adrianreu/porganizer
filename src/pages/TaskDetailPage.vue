<template>
<q-page class="q-pa-md">
  <div class="column q-gutter-md">
    <div class="text-h5">Task</div>
    <q-input
      v-model="task.name"
      placeholder="Name"
      outlined
      dense
    />
    <q-input
      v-model="task.description"
      type="textarea"
      placeholder="Description"
      outlined
      dense
    />
    <priority-select v-model="task.priority" />
    <q-select
      v-model="task.precondition"
      :options="taskPreconditionOptions"
      label="Precondition"
      outlined
      dense
      emit-value
      map-options
      dropdown-icon="mdi-chevron-down"
      clearable
      clear-icon="mdi-close"
    />
    <q-checkbox
      :model-value="task.completed"
      label="Completed"
      color="primary"
      dense
      @update:model-value="
      projectStore.toggleTaskCompletion(Number.parseInt(projectId.toString(), 10), task.id)
      "
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
      <div class="col-shrink" v-if="taskId !== 'new'">
        <q-btn
          round
          icon="mdi-delete"
          flat
          color="red-10"
          dense
          @click="deleteTaskFromProject"
        ></q-btn>
      </div>
    </div>
  </q-footer>
</q-page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { Priority, Task } from 'src/stores/interfaces';
import { useRoute, useRouter } from 'vue-router';
import { useProjectStore } from 'src/stores/projectStore';
import PrioritySelect from 'src/components/PrioritySelect.vue';

const route = useRoute();
const router = useRouter();
const projectStore = useProjectStore();

const task = ref<Task>({
  id: -1,
  name: '',
  priority: Priority.Medium,
  description: '',
  completed: false,
  completedAt: null,
  precondition: null,
});

const taskId = computed(() => route.params.taskId);
const projectId = computed(() => route.params.projectId);

const taskPreconditionOptions = computed(() => {
  const projectIdParsed = Number.parseInt(projectId.value.toString(), 10);
  const project = projectStore.getProjectById(projectIdParsed);
  const taskIdParsed = Number.parseInt(taskId.value.toString(), 10);
  if (project) {
    return project.tasks
      .filter((filterTask: Task) => filterTask.id !== taskIdParsed)
      .map((mapTask) => ({
        label: mapTask.name,
        value: mapTask.id,
      }));
  }
  return [];
});

function save() {
  if (taskId.value && taskId.value === 'new') {
    const projectIdParsed = Number.parseInt(projectId.value.toString(), 10);
    projectStore.addTaskToProject(projectIdParsed, task.value);
    router.replace(`/projects/${projectId.value}/tasks/${task.value.id}`);
  }
}

function deleteTaskFromProject() {
  if (taskId.value && taskId.value !== 'new') {
    const projectIdParsed = Number.parseInt(projectId.value.toString(), 10);
    const taskIdParsed = Number.parseInt(taskId.value.toString(), 10);
    projectStore.deleteTaskFromProject(projectIdParsed, taskIdParsed);
    router.replace(`/projects/${projectId.value}`);
  }
}

onMounted(() => {
  if (taskId.value && taskId.value === 'new') {
    task.value = {
      id: -1,
      name: '',
      priority: Priority.Medium,
      description: '',
      completed: false,
      completedAt: null,
      precondition: null,
    };
  } else {
    const taskIdParsed = Number.parseInt(taskId.value.toString(), 10);
    const projectIdParsed = Number.parseInt(projectId.value.toString(), 10);
    const taskFromStore = projectStore.getTaskById(projectIdParsed, taskIdParsed);
    if (taskFromStore) {
      task.value = taskFromStore;
    } else {
      router.replace(`/projects/${projectId.value}/tasks/new`);
    }
  }
});
</script>
