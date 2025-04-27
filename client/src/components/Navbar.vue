<template>
    <nav class="navbar">
      <ul>
        <li><router-link to="/">Accueil</router-link></li>
        <li><router-link to="/login">Connexion</router-link></li>
        <li><router-link to="/register">Inscription</router-link></li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'Navbar'
  }
  </script>
  
  <style scoped>
  .navbar {
    background-color: #ff5733;
    padding: 10px;
    text-align: center;
  }
  
  .navbar ul {
    list-style-type: none;
    padding: 0;
  }
  
  .navbar li {
    display: inline;
    margin: 0 15px;
  }
  
  .navbar a {
    text-decoration: none;
    color: white;
    font-size: 1.2rem;
    font-weight: bold;
  }
  
  .navbar a:hover {
    color: #333;
  }
  </style>
  