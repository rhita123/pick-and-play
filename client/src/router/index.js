import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import WorkList from '../views/WorkList.vue';
import WorkDetails from '../views/WorkDetails.vue';
import NewReview from '../views/NewReview.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/works', name: 'WorkList', component: WorkList },
  { path: '/new-review', name: 'NewReview', component: NewReview },
  { path: '/work/:id', name: 'WorkDetails', component: WorkDetails, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
