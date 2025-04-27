<template>
    <div class="register">
      <h1>Créer un compte</h1>
  
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="username">Nom d'utilisateur :</label>
          <input type="text" id="username" v-model="username" required />
        </div>
  
        <div class="form-group">
          <label for="email">Email :</label>
          <input type="email" id="email" v-model="email" required />
        </div>
  
        <div class="form-group">
          <label for="password">Mot de passe :</label>
          <input type="password" id="password" v-model="password" required />
        </div>
  
        <button type="submit">S'inscrire</button>
      </form>
  
      <router-link to="/login" class="back-button">← Déjà inscrit ? Connectez-vous</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Register',
    data() {
      return {
        username: '',
        email: '',
        password: ''
      };
    },
    methods: {
      async register() {
        try {
          const response = await this.$http.post('http://localhost:5050/api/register', {
            username: this.username,
            email: this.email,
            password: this.password
          });
          alert(response.data.message);
          this.$router.push('/login');
        } catch (error) {
          alert('Erreur lors de l\'inscription ❌');
          console.error(error);
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
  
  .success {
    color: green;
    margin-top: 10px;
  }
  
  .error {
    color: red;
    margin-top: 10px;
  }
  </style>