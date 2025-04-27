<template>
  <div id="app">
    <nav class="navbar">
      <img src="./assets/logo.png" alt="Popcorn & Opinions Logo" class="logo" />
      <div class="nav-links">
        <router-link to="/">Accueil</router-link>
        <router-link to="/works">Films & Séries</router-link>
        <router-link to="/login">Connexion</router-link>
        <router-link to="/register">Inscription</router-link>
        <router-link 
            v-if="user && user.role === 'admin'" 
              to="/admin" 
                class="nav-link">
            Admin
        </router-link>
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
  gap: 25px;
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
