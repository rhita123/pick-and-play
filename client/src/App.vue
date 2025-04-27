<template>
  <div id="app">
    <header class="navbar">
      <img src="./assets/logo.png" alt="Popcorn & Opinions" class="logo" />
      <nav class="nav-links">
        <router-link to="/">Accueil</router-link>
        <router-link to="/works">Films & Séries</router-link>
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
  padding: 10px 30px; /* élargi pour respirer */
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 10;
}

.logo {
  height: 50px;
}

.nav-links {
  display: flex;
  gap: 30px; /* espace plus large entre les liens */
}

.nav-links a {
  color: #fff;
  font-weight: bold;
  text-decoration: none;
  font-size: 1rem;
}

.nav-links a:hover {
  text-decoration: underline;
}

#app > *:not(.navbar) {
  margin-top: 90px; /* pour compenser le header plus haut */
}
</style>
