<template>
    <div class="admin-page" v-if="isAdmin">
      <h1>👩‍💻 Espace Admin</h1>
  
      <div v-if="users.length === 0">
        <p>Aucun utilisateur trouvé.</p>
      </div>
  
      <div v-else>
        <h2>Liste des utilisateurs :</h2>
        <ul>
          <li v-for="user in users" :key="user.id">
            {{ user.username }} - {{ user.email }} ({{ user.role }})
          </li>
        </ul>
      </div>
    </div>
    <div v-else>
      <p>Vous devez être un administrateur pour accéder à cette page.</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'AdminPage',
    data() {
      return {
        users: [],
        isAdmin: false,
      };
    },
    async mounted() {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.role === 'admin') {
        this.isAdmin = true;
        this.fetchUsers();
      } else {
        this.isAdmin = false;
      }
    },
    methods: {
      async fetchUsers() {
        try {
          const response = await axios.get('http://localhost:5050/api/users');
          this.users = response.data;
        } catch (error) {
          console.error('Erreur chargement des utilisateurs :', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .admin-page {
    padding: 2rem;
  }
  </style>