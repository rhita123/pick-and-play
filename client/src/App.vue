<template>
  <div id="app">
    <header class="navbar">
      <img src="/src/assets/logo.png" alt="Popcorn & Opinions" class="logo" />
      <nav class="nav-links">
        <router-link to="/">Accueil</router-link>
        <router-link to="/login">Connexion</router-link>
        <router-link to="/register">Inscription</router-link>
      </nav>
    </header>

    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
.navbar {
  background-color: #f25c3b;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  height: 50px;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-links a {
  color: #fff;
  font-weight: bold;
  text-decoration: none;
}

.nav-links a:hover {
  text-decoration: underline;
}
</style>
