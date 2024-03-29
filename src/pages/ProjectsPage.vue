<template>
  <q-page>
    <div class="q-pa-lg text-grey-7 text-weight-medium">Projects</div>
    <q-list separator v-if="sortedProjectsByPriority.length > 0">
      <preview-row
        v-for="project in sortedProjectsByPriority"
        :key="project.id"
        :show-checkbox="false"
        :model-value="false"
        :text="project.name"
        :priority="project.priority"
        @click="router.push(`/projects/${project.id}`)"
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
        to="/projects/new"
      >
        Create project
      </q-btn>
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

const { sortedProjectsByPriority } = storeToRefs(projectStore);
</script>
