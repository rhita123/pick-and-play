<template>
    <div class="login">
      <h1>Connexion</h1>
      <form @submit.prevent="login">
        <div>
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div>
          <label for="password">Mot de passe</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'Login',
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      async login() {
        try {
          const response = await axios.post('http://localhost:5050/auth/login', {
            Email: this.email,
            Mot_de_passe: this.password,
          });

          const token = response.data.token;
          localStorage.setItem('token', token);

          const payload = JSON.parse(atob(token.split('.')[1]));
          if (payload.role === 'admin') {
            this.$router.push({ name: 'Admin' });
          } else {
            this.$router.push({ name: 'Home' });
          }
        } catch (error) {
          console.error('Erreur lors de la connexion:', error);
          alert('❌ Échec de la connexion');
        }
      }
    }
  };
  </script>
  
  
  <style scoped>
  .login {
    max-width: 400px;
    margin: 120px auto 40px;
    padding: 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0,0,0,0.1);
  }
  
  h1 {
    text-align: center;
    margin-bottom: 30px;
    color: #f25c3b;
  }
  
  
  
  label {
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  button {
    width: 100%;
    padding: 12px;
    background-color: #f25c3b;
    color: white;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    font-size: 1.2rem;
  }
  
  button:hover {
    background-color: #e04b2d;
  }
  
  
  </style>
  