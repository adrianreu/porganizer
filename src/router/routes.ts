import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'projects', component: () => import('pages/ProjectsPage.vue') },
      { path: 'todos', component: () => import('pages/TodosPage.vue') },
      { path: 'todos', component: () => import('pages/TodosPage.vue') },
    ],
  },

  {
    path: '/',
    component: () => import('layouts/WithoutFooterLayout.vue'),
    children: [
      { path: 'projects/:id', component: () => import('pages/ProjectDetailPage.vue') },
      { path: 'projects/:projectId/tasks/:taskId', component: () => import('pages/TaskDetailPage.vue') },
      { path: 'todos/:id', component: () => import('pages/TodoDetailPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
