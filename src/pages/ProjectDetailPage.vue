<template>
<q-page>
  <div class="q-ma-md">
    <div class="column q-gutter-md">
      <div class="text-h5">Project</div>
      <q-input
        v-model="project.name"
        placeholder="Name"
        outlined
        dense
      />
      <q-input
        v-model="project.description"
        type="textarea"
        placeholder="Description"
        outlined
        dense
      />
      <q-select
        v-model="project.priority"
        :options="priorityOptions"
        label="Priority"
        outlined
        dense
        emit-value
        map-options
        dropdown-icon="mdi-chevron-down"
      >
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section avatar>
              <q-icon
              :name="getPriorityVisualization(scope.opt.value).icon"
              :color="getPriorityVisualization(scope.opt.value).color"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ scope.opt.label }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-select>
      <q-select
        v-model="project.color"
        :options="colorOptions"
        label="Tag Color"
        outlined
        dense
        emit-value
        map-options
        dropdown-icon="mdi-chevron-down"
      >
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps" dense>
            <q-item-section>
              <q-badge :color="scope.opt.value">{{ scope.opt.label }}</q-badge>
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>

  </div>

  <div class="q-mx-md q-mt-lg" v-if="project.tasks?.length">
    <div class="text-grey-7 text-weight-medium">Tasks</div>
  </div>

  <q-list separator v-if="sortedTasks?.length">
    <preview-row
      v-for="task in sortedTasks"
      :key="task.id"
      :show-checkbox="false"
      :model-value="task.completed"
      :text="task.name"
      :priority="task.priority"
      @click="router.push(`/projects/${project.id}/tasks/${task.id}`)"
    />
  </q-list>
  <div class="q-pa-md">
    <div v-if="id !== 'new'">
      <q-btn
        icon="mdi-plus"
        class="full-width"
        outline
          color="grey-9"
          square
          unelevated
        @click="router.push(`/projects/${project.id}/tasks/new`)"
      >Add Task</q-btn>
    </div>
  </div>
  <q-footer class="bg-white q-pa-md" bordered>
    <div class="row justify-between q-col-gutter-md">
      <div class="col-shrink">
        <q-btn round icon="mdi-arrow-left" flat color="black" dense @click="router.go(-1)"></q-btn>
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
      <div class="col-shrink" v-if="id !== 'new'">
        <q-btn round icon="mdi-delete" flat color="red-10" dense @click="deleteProject"></q-btn>
      </div>
    </div>
  </q-footer>
</q-page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { Priority, Project } from 'src/stores/interfaces';
import { useRoute, useRouter } from 'vue-router';
import { useProjectStore } from 'src/stores/projectStore';
import PreviewRow from 'src/components/PreviewRow.vue';
import { usePriority } from 'src/composables/usePriority';

const route = useRoute();
const router = useRouter();
const projectStore = useProjectStore();
const { getPriorityVisualization } = usePriority();

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
const colorOptions = ref<{
  label: string;
  value: string;
}[]>([
  { label: 'Red', value: 'red' },
  { label: 'Blue', value: 'blue' },
  { label: 'Green', value: 'green' },
  { label: 'Yellow', value: 'orange' },
  { label: 'Purple', value: 'purple' },
  { label: 'Grey', value: 'grey' },
  { label: 'Black', value: 'black' },
  { label: 'Brown', value: 'brown' },
  { label: 'Pink', value: 'pink' },
  { label: 'Cyan', value: 'cyan' },
  { label: 'Teal', value: 'teal' },
  { label: 'Indigo', value: 'indigo' },
  { label: 'Lime', value: 'lime' },
  { label: 'Amber', value: 'amber' },
  { label: 'Deep Orange', value: 'deep-orange' },
  { label: 'Deep Purple', value: 'deep-purple' },
  { label: 'Light Blue', value: 'light-blue' },
  { label: 'Light Green', value: 'light-green' },
  { label: 'Orange', value: 'orange' },
  { label: 'Blue Grey', value: 'blue-grey' },
  { label: 'Grey', value: 'grey' },
  { label: 'Brown', value: 'brown' },
  { label: 'Pink', value: 'pink' },
  { label: 'Cyan', value: 'cyan' },
  { label: 'Teal', value: 'teal' },
  { label: 'Indigo', value: 'indigo' },
  { label: 'Lime', value: 'lime' },
  { label: 'Amber', value: 'amber' },
  { label: 'Deep Orange', value: 'deep-orange' },
  { label: 'Deep Purple', value: 'deep-purple' },
  { label: 'Light Blue', value: 'light-blue' },
  { label: 'Light Green', value: 'light-green' },
  { label: 'Orange', value: 'orange' },
  { label: 'Blue Grey', value: 'blue-grey' },
  { label: 'Grey', value: 'grey' },
  { label: 'Brown', value: 'brown' },
  { label: 'Pink', value: 'pink' },
  { label: 'Cyan', value: 'cyan' },
  { label: 'Teal', value: 'teal' },
  { label: 'Indigo', value: 'indigo' },
]);
const project = ref<Project>({
  id: -1,
  name: '',
  priority: Priority.Medium,
  color: 'blue',
  tasks: [],
  description: '',
});

const sortedTasks = computed(() => project.value.tasks.toSorted((a, b) => b.priority - a.priority));

const id = computed(() => route.params.id);

function save() {
  if (id.value && id.value === 'new') {
    projectStore.addProject(project.value);
    router.replace(`/projects/${project.value.id}`);
  }
}

function deleteProject() {
  if (id.value && id.value !== 'new') {
    projectStore.deleteProject(Number.parseInt(id.value.toString(), 10));
    router.replace('/projects');
  }
}

onMounted(() => {
  if (id.value && id.value === 'new') {
    project.value = {
      id: -1,
      name: '',
      priority: Priority.Medium,
      color: 'blue',
      description: '',
      tasks: [],
    };
  } else {
    const projectFromStore = projectStore.getProjectById(Number.parseInt(id.value.toString(), 10));
    if (projectFromStore) {
      project.value = projectFromStore;
    } else {
      router.replace('/projects/new');
    }
  }
});
</script>
