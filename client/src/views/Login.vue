<template>
    <div class="login">
      <h1>Connexion</h1>
  
      <form @submit.prevent="login">
        <div class="form-group">
          <label>Email :</label>
          <input type="email" v-model="email" required />
        </div>
  
        <div class="form-group">
          <label>Mot de passe :</label>
          <input type="password" v-model="password" required />
        </div>
  
        <button type="submit">Se connecter</button>
      </form>
  
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    name: 'Login',
    data() {
      return {
        email: '',
        password: '',
        errorMessage: ''
      }
    },
    methods: {
      async login() {
        try {
          const response = await axios.post('http://localhost:5050/api/login', {
            email: this.email,
            password: this.password
          });
          console.log(response.data);
  
          alert('✅ Connexion réussie ! Bienvenue ' + response.data.user.username + ' !');
          
          // ➔ Ici plus tard tu pourras rediriger vers une autre page par exemple
          // this.$router.push('/works');
  
        } catch (error) {
          console.error(error);
          this.errorMessage = error.response?.data?.error || 'Erreur lors de la connexion';
        }
      }
    }
  }
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
  
  .form-group {
    margin-bottom: 20px;
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
  
  .error {
    margin-top: 20px;
    color: red;
    text-align: center;
  }
  </style>
  