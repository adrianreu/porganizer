<template>
<q-item clickable v-ripple>
  <q-item-section>
    <div class="row no-wrap q-col-gutter-xs items-center full-width">
      <div class="col-auto">
        <q-checkbox
          v-if="showCheckbox"
          color="grey-10"
          dense
          :model-value="modelValue"
          @update:model-value="$emit('update:model-value', $event)"
        />
      </div>
      <div class="col-auto">
        <q-icon
          :name="priorityVisualization.icon"
          size="sm"
          :color="priorityVisualization.color"
        />
      </div>
      <div class="col-shrink overflow"
      :style="`${modelValue ? 'text-decoration: line-through' : ''}`">
        {{ text }}
      </div>
      <div class="col-grow text-right" v-if="showBadge">
        <q-badge :color="badgeColor" @click="router.push('/projects/' + projectId)">
          <q-icon
            :name="badgeIcon"
            size="xs"
            v-if="badgePriority"
            class="q-mr-xs"
          /> {{ badgeText }}
        </q-badge>
      </div>
      <div class="text-right" :class="[showBadge ? 'col-auto' : 'col-grow']">
        <q-icon name="mdi-chevron-right" size="sm" />
      </div>
    </div>
  </q-item-section>
</q-item>
</template>

<script setup lang="ts">
import { usePriority } from 'src/composables/usePriority';
import { Priority } from 'src/stores/interfaces';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

interface PropsInterface {
  modelValue: boolean,
  showCheckbox: boolean,
  text: string,
  priority: Priority,
  showBadge?: boolean,
  badgeColor?: string,
  badgeText?: string,
  badgePriority?: Priority,
  projectId?: number,
}
const router = useRouter();
const props = defineProps<PropsInterface>();

const { getPriorityVisualization } = usePriority();

const badgeIcon = computed(
  () => getPriorityVisualization(props.badgePriority || Priority.Low).icon,
);

const priorityVisualization = computed(() => getPriorityVisualization(props.priority));
</script>
