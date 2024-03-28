import { Priority } from 'src/stores/interfaces';

export function usePriority() {
  function getPriorityVisualization(priority: Priority) {
    switch (priority) {
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
  }

  return {
    getPriorityVisualization,
  };
}
