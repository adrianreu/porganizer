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
  <q-list separator>
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
      @click="
        router.push(`/projects/${dailyProjectTask.projectId}/tasks/${dailyProjectTask.id}`)
        "
        @update:model-value="projectStore.toggleTaskCompletion(
          dailyProjectTask.projectId,
          dailyProjectTask.id,
        )"
    />
  </q-list>
  <div class="q-pa-md">
    <q-btn
      icon="mdi-plus"
      class="full-width"
      unelevated
      to="/projects/new"
      outline
      color="grey-9"
      square
    >
      Create project
    </q-btn>
    <div class="q-mt-md">
      go to all
      <a style="text-decoration: underline;" class="text-primary" @click="router.push('/projects')">
        your projects
      </a>
    </div>

  </div>
</q-page>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import PreviewRow from 'src/components/PreviewRow.vue';
import { useProjectStore } from 'src/stores/projectStore';
import { useRouter } from 'vue-router';

const router = useRouter();

const projectStore = useProjectStore();
const { dailyProjectTasks } = storeToRefs(projectStore);
</script>
