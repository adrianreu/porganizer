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
    <q-select
      v-model="task.priority"
      :options="priorityOptions"
      label="Priority"
      outlined
      dense
      emit-value
      map-options
        dropdown-icon="mdi-chevron-down"
    />
    <q-select
      v-model="task.precondition"
      :options="taskPreconditionOptions"
      label="Precondition"
      outlined
      dense
      emit-value
      map-options
      dropdown-icon="mdi-chevron-down"
    />
    <q-checkbox
      v-model="task.completed"
      label="Completed"
      color="primary"
      dense
    />
  </div>
  <q-footer class="bg-white q-pa-md" bordered>
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
    </div>
  </q-footer>
</q-page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { Priority, Task } from 'src/stores/interfaces';
import { useRoute, useRouter } from 'vue-router';
import { useProjectStore } from 'src/stores/projectStore';

const route = useRoute();
const router = useRouter();
const projectStore = useProjectStore();

const priorityOptions = ref<{
    label: string;
    value: Priority;
  }[]>([
    { label: 'Lower', value: Priority.Lower },
    { label: 'Low', value: Priority.Low },
    { label: 'Medium', value: Priority.Medium },
    { label: 'High', value: Priority.High },
    { label: 'Higher', value: Priority.Higher },
  ]);

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
