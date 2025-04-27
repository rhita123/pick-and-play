<template>
    <header class="header">
      <div class="logo">
        <router-link to="/">🍹 Cocktail App</router-link>
      </div>
      <nav>
       
        <router-link to="/">Home</router-link>
        <router-link to="/cocktail/list/all">Cocktails</router-link>
        <router-link to="/restaurant/list/all">Restaurants</router-link>
        <router-link to="/employee/list/all">Employees</router-link>
        <router-link to="/ingredient/list/all">Ingredients</router-link>
       <!--  <router-link to="/cocktail/edit/0">Add Cocktail</router-link>
        <router-link to="/restaurant/edit/0">Add Restaurant</router-link>
        <router-link to="/user/edit/0">Add User</router-link>
        <router-link to="/ingredient/edit/0">Add Ingredient</router-link>-->
        <router-link to="/auth/register">Register</router-link>

      </nav>
    </header>
  </template>
  
  <script>
  export default {
    name: 'Header',
  };
  </script>
  
  <style scoped>
  .header {
    background-color: #42b983;
    color: white;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .logo {
    font-size: 1.5em;
    font-weight: bold;
  }
  
  nav {
    display: flex;
    gap: 20px;
  }
  
  nav a {
    color: white;
    text-decoration: none;
    font-weight: 500;
  }
  
  nav a:hover {
    text-decoration: underline;
  }
  </style>
  