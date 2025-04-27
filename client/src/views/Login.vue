<template>
    <div class="login">
      <div class="form-container">
        <h2>Connexion</h2>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="email">Adresse Email</label>
            <input type="email" id="email" v-model="email" required>
          </div>
  
          <div class="form-group">
            <label for="password">Mot de passe</label>
            <input type="password" id="password" v-model="password" required>
          </div>
  
          <button type="submit">Se connecter</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Login',
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      handleLogin() {
        console.log('Tentative de connexion avec:', this.email, this.password);
        // Ici on mettra la vraie logique après (API).
      }
    }
  }
  </script>
  
  <style scoped>
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
    background-color: #f5f5f5;
  }
  
  .form-container {
    background: white;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    width: 350px;
    text-align: center;
  }
  
  .form-container h2 {
    margin-bottom: 20px;
    color: #ff5733;
  }
  
  .form-group {
    margin-bottom: 20px;
    text-align: left;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    color: #333;
  }
  
  .form-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  button {
    width: 100%;
    padding: 12px;
    background-color: #ff5733;
    color: white;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #e04a2d;
  }
  </style>
  