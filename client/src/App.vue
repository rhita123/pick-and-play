<template>
  <div id="app">
    <nav class="navbar">
      <img src="/logo.webp" alt="Popcorn & Opinions Logo" class="logo" />
      <div class="nav-links">
        <router-link to="/">Accueil</router-link>
        <router-link to="/works">Films & Séries</router-link>
        <router-link to="/login">Connexion</router-link>
        <router-link to="/register">Inscription</router-link>
        
      </div>
    </nav>
    
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      user: null
    }
  },
  mounted() {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      console.log(this.user); // pour vérifier ce qui est stocké
    }
  }
}
</script>
<style scoped>
.navbar {
  background-color: #f25c3b;
  padding: 10px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between; /* Laisser space-between pour diviser la zone entre le logo et les liens */
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 10;
}

.logo {
  height: 50px;
  margin-right: 50px; /* Ajouter un petit espace après le logo */
}

.nav-links {
  display: flex;
  gap: 25px;
  justify-content: center; /* Centrer les liens de navigation */
  flex: 1; /* Prendre tout l'espace restant pour centrer les liens */
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

/* Pour éviter que le contenu soit caché derrière la navbar */
#app > *:not(.navbar) {
  margin-top: 80px;
}
</style>