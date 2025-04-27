import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import WorkList from '../views/WorkList.vue';
import WorkDetails from '../views/WorkDetails.vue';
import NewReview from '../views/NewReview.vue';
import AdminPage from '../views/Admin.vue';  // Importer la page Admin

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/works', name: 'WorkList', component: WorkList },
  { path: '/new-review/:id', name: 'NewReview', component: NewReview, props: true },
  { path: '/work/:id', name: 'WorkDetails', component: WorkDetails, props: true },
  // Nouvelle route pour la page Admin
  { path: '/admin', name: 'Admin', component: AdminPage, meta: { requiresAuth: true, role: 'admin' } }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Vérification du rôle dans beforeEach
router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'));

  // Si la route nécessite une authentification
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!user) {
      next({ name: 'Login' });  // Redirige vers Login si non authentifié
    } else if (to.meta.role && user.role !== to.meta.role) {
      next({ name: 'Home' });  // Redirige vers Home si l'utilisateur n'est pas admin
    } else {
      next();  // Permet l'accès si l'utilisateur est bien authentifié et a le bon rôle
    }
  } else {
    next();  // Permet l'accès aux routes publiques
  }
});

export default router;