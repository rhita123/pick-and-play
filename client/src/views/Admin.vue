<template>
    <div class="admin-page">
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
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    name: 'AdminPage',
    data() {
      return {
        users: []
      }
    },
    async mounted() {
      try {
        const response = await axios.get('http://localhost:5050/api/users');
        this.users = response.data;
      } catch (error) {
        console.error('Erreur chargement users :', error);
      }
    }
  }
  </script>
  
  <style scoped>
  .admin-page {
    padding: 2rem;
  }
  </style>