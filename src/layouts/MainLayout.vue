<template>
<q-layout view="lHh Lpr lFf">
  <q-page-container>
    <router-view />
  </q-page-container>
  <q-footer bordered class="bg-white">
    <q-tabs dense class="text-grey-10">
      <q-route-tab
        to="/"
        exact
        replace
        label="Start"
        icon="mdi-home"
      />
      <q-route-tab
        to="/projects"
        exact
        replace
        label="Projects"
        icon="mdi-package"
      />
      <q-route-tab
        to="/todos"
        exact
        replace
        label="Todos"
        icon="mdi-checkbox-marked-circle-outline"
      />
    </q-tabs>
  </q-footer>
</q-layout>
</template>

<script setup lang="ts">
import { useTodoStore } from 'src/stores/todoStore';
import { onMounted } from 'vue';

const todoStore = useTodoStore();

onMounted(() => {
  todoStore.cleanUp();
});
</script>
