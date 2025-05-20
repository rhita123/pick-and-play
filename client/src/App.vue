<template>
  <div id="app">
    <nav class="navbar">
      <img src="/logo.webp" alt="Pick & Play Logo" class="logo" />
      <div class="nav-links">
        <router-link to="/">Accueil</router-link>
        <router-link to="/works">Catalogue</router-link>
        <router-link v-if="!isAuthenticated" to="/login">Connexion</router-link>
        <router-link v-if="!isAuthenticated" to="/register">Inscription</router-link>
        <router-link v-if="isAdmin" to="/admin">Espace Admin</router-link>
        <button v-if="isAuthenticated" @click="logout">Déconnexion</button>
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
      token: localStorage.getItem('token')
    };
  },
  computed: {
    isAuthenticated() {
      return !!this.token;
    },
    isAdmin() {
      try {
        if (!this.token) return false;
        const payload = JSON.parse(atob(this.token.split('.')[1]));
        return payload.role === 'admin';
      } catch {
        return false;
      }
    }
  },
  watch: {
    $route() {
      this.token = localStorage.getItem('token');
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.token = null;
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.navbar {
  background: linear-gradient(to right, #ffe082, #80d8ff);
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

.nav-links a,
.nav-links button {
  color: #333;
  font-weight: 600;
  text-decoration: none;
  font-size: 1rem;
  cursor: pointer;
  font-family: inherit;
  background: none;
  border: none;
  padding: 0;
}

.nav-links a:hover,
.nav-links button:hover {
  color: #2196f3;
}

/* Pour éviter que le contenu soit caché derrière la navbar */
#app > *:not(.navbar) {
  margin-top: 80px;
}
</style>