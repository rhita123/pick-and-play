import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Admin from '@/views/Admin.vue';
import WorkDetails from '@/views/WorkDetails.vue';
import NewReview from '@/views/NewReview.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/work/:id',
    name: 'WorkDetails',
    component: WorkDetails,
    props: true
  },
  {
    path: '/new-review',
    name: 'NewReview',
    component: NewReview
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
