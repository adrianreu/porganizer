<template>
<q-item clickable v-ripple>
  <q-item-section>
    <div class="row no-wrap q-col-gutter-xs items-center">
      <div class="col-shrink">
        <q-checkbox
          v-if="showCheckbox"
          color="grey-10"
          dense
          :model-value="modelValue"
          @update:model-value="$emit('update:model-value', $event)"
        />
      </div>
      <div class="col-shrink">
        <q-icon :name="priorityVisualization.icon" size="sm" :color="priorityVisualization.color" />
      </div>
      <div class="col-grow" :style="`${modelValue ? 'text-decoration: line-through' : ''}`">
        {{ text }}
      </div>
      <div class="col-shrink" v-if="showBadge">
        <q-badge :label="badgeText" :color="badgeColor" />
      </div>
      <div class="col-shrink">
        <q-icon name="mdi-chevron-right" size="sm" />
      </div>
    </div>
  </q-item-section>
</q-item>
</template>

<script setup lang="ts">
import { Priority } from 'src/stores/interfaces';
import { computed } from 'vue';

interface PropsInterface {
  modelValue: boolean,
  showCheckbox: boolean,
  text: string,
  priority: Priority,
  showBadge?: boolean,
  badgeColor?: string,
  badgeText?: string,
}

const props = defineProps<PropsInterface>();

const priorityVisualization = computed(() => {
  switch (props.priority) {
    case Priority.Lower:
      return {
        icon: 'mdi-chevron-double-down',
        color: 'blue-7',
      };
    case Priority.Low:
      return {
        icon: 'mdi-chevron-down',
        color: 'blue-7',
      };

    case Priority.High:
      return {
        icon: 'mdi-chevron-up',
        color: 'red-7',
      };
    case Priority.Higher:
      return {
        icon: 'mdi-chevron-double-up',
        color: 'red-7',
      };
    case Priority.Medium:
    default:
      return {
        icon: 'mdi-minus',
        color: 'grey-7',
      };
  }
});
</script>
