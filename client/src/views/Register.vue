<template>
    <div class="register">
      <h1>Inscription</h1>
      <form @submit.prevent="register">
        <input type="text" v-model="username" placeholder="Nom d'utilisateur" required />
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Mot de passe" required />
  
        <!-- Nouveau champ : choisir role -->
        <select v-model="role" required>
          <option value="user">Utilisateur</option>
          <option value="admin">Admin</option>
        </select>
  
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    name: 'Register',
    data() {
      return {
        username: '',
        email: '',
        password: '',
        role: 'user' // valeur par défaut
      };
    },
    methods: {
      async register() {
        try {
          const response = await axios.post('http://localhost:5050/api/register', {
            username: this.username,
            email: this.email,
            password: this.password,
            role: this.role
          });
          alert(response.data.message);
          this.$router.push('/login');
        } catch (error) {
          console.error('Erreur inscription :', error);
          alert('❌ Erreur lors de l’inscription');
        }
      }
    }
  }
  </script>
  
  
  <style scoped>
  .register {
    max-width: 400px;
    margin: 100px auto;
    padding: 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0,0,0,0.1);
    text-align: center;
  }
  
  input {
    display: block;
    width: 100%;
    margin: 10px 0;
    padding: 10px;
  }
  
  button {
    background-color: #f25c3b;
    color: white;
    border: none;
    padding: 12px;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    width: 100%;
    margin-top: 10px;
  }
  
  button:hover {
    background-color: #e04b2d;
  }
  
  
  </style>