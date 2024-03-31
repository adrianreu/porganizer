<template>
  <q-select
    :model-value="props.modelValue"
    :options="priorityOptions"
    label="Priority"
    outlined
    dense
    emit-value
    map-options
    dropdown-icon="mdi-chevron-down"

    @update:model-value="$emit('update:modelValue', $event)"
  >
    <template v-slot:prepend>
      <q-icon
        :name="getPriorityVisualization(modelValue).icon"
        :color="getPriorityVisualization(modelValue).color"
      />
    </template>
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
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Priority } from '../stores/interfaces';
import { usePriority } from '../composables/usePriority';

interface PropsInterface {
  modelValue: Priority,
}

const props = defineProps<PropsInterface>();

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
</script>
