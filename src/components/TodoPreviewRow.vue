<template>
  <q-item clickable v-ripple>
    <q-item-section>
      <div class="row no-wrap q-col-gutter-xs items-center">
        <div class="col-shrink">
          <q-checkbox
            color="grey-10"
            dense
            :model-value="modelValue"
            @update:model-value="$emit('update:model-value', $event)"
          />
        </div>

        <div class="col-grow" :style="`${modelValue ? 'text-decoration: line-through' : ''}`">
          {{ text }}
        </div>
        <div class="col-shrink" v-if="daily">
          <q-icon name="mdi-repeat" size="sm" />
        </div>
        <div class="col-shrink">
          <q-icon name="mdi-chevron-right" size="sm" />
        </div>
      </div>
    </q-item-section>
  </q-item>
  </template>

<script setup lang="ts">
interface PropsInterface {
  modelValue: boolean,
  text: string,
  daily: boolean,
}
defineProps<PropsInterface>();
</script>
