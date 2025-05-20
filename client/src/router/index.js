import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import WorkList from '../views/WorkList.vue';
import WorkDetails from '../views/WorkDetails.vue';
import NewReview from '../views/NewReview.vue';
import AdminDashboard from '../views/AdminDashboard.vue';  // Importer la page AdminDashboard

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/works', name: 'WorkList', component: WorkList },
  { path: '/new-review/:id', name: 'NewReview', component: NewReview, props: true },
  { path: '/work/:id', name: 'WorkDetails', component: WorkDetails, props: true },
  // Nouvelle route pour la page Admin
  { path: '/admin', name: 'Admin', component: AdminDashboard, meta: { requiresAuth: true, role: 'admin' } }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Vérification du rôle dans beforeEach
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiredRole = to.meta?.role;

  if (requiresAuth) {
    if (!token) {
      return next({ name: 'Login' });
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      if (requiredRole && payload.role !== requiredRole) {
        return next({ name: 'Home' });
      }

      return next();
    } catch (error) {
      console.error('Erreur lors du décodage du token :', error);
      return next({ name: 'Login' });
    }
  }

  next();
});

export default router;