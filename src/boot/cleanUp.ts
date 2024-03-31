import { boot } from 'quasar/wrappers';
import { useTodoStore } from 'src/stores/todoStore';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app, router }) => {
  const todoStore = useTodoStore();
  router.beforeEach((to, from, next) => {
    todoStore.cleanUp();
    next();
  });
});
