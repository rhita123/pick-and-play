import Vue from 'vue';
import Router from 'vue-router';
import Accueil from '@/components/accueil.vue';
import Cocktail from '@/components/cocktail.vue';
import Restaurant from '@/components/restaurant.vue';
import Employee from '@/components/employee.vue'; 
import Ingredient from '@/components/ingredient.vue';
import AuthModule from '@/components/authmodule.vue'; // Import the authentication module

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Accueil',
      component: Accueil,
    },
    {
      path: '/cocktail/:action/:id',
      name: 'Cocktail',
      component: Cocktail,
      props: true,
    },
    {
      path: '/restaurant/:action/:id',
      name: 'Restaurant',
      component: Restaurant,
      props: true,
    },
    {
      path: '/employee/:action/:EmployeesID',
      name: 'Employee',
      component: Employee,
      props: true, // Pass route parameters as props
    },
    
    {
      path: '/ingredient/:action/:id',
      name: 'Ingredient',
      component: Ingredient,
      props: true,
    },
    {
      path: '/auth/:action',
      name: 'Auth',
      component: AuthModule,
      props: true, // Pass route parameters as props to the AuthModule
    },
  ],
});

