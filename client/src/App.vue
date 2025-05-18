<template>
  <div id="app">
    <nav class="navbar">
      <img src="/logo.webp" alt="Pick & Play Logo" class="logo" />
      <div class="nav-links">
        <router-link to="/">Accueil</router-link>
        <router-link to="/works">Catalogue</router-link>
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
  background: linear-gradient(to right, #ffe082, #80d8ff); /* Jaune ➜ bleu */
  padding: 12px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 10;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.logo {
  height: 45px;
}

.nav-links {
  display: flex;
  gap: 30px;
  justify-content: center;
  flex: 1;
}

.nav-links a {
  color: #333;
  font-weight: 600;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: #2196f3;
}


/* Pour éviter que le contenu soit caché derrière la navbar */
#app > *:not(.navbar) {
  margin-top: 80px;
}

</style>