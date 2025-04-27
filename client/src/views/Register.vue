<template>
    <div class="register">
      <h1>Créer un Compte</h1>
      <form @submit.prevent="register">
        <input v-model="username" type="text" placeholder="Nom d'utilisateur" required />
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Mot de passe" required />
        <button type="submit">S'inscrire</button>
      </form>
      <p v-if="message" class="success">{{ message }}</p>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Register',
    data() {
      return {
        username: '',
        email: '',
        password: '',
        message: '',
        error: ''
      }
    },
    methods: {
      async register() {
        try {
          const response = await this.$http.post('/register', {
            username: this.username,
            email: this.email,
            password: this.password
          });
          this.message = response.data.message;
          this.error = '';
          // Après inscription réussie, on peut rediriger vers connexion
          this.$router.push('/login');
        } catch (err) {
          console.error(err);
          this.error = err.response?.data?.error || 'Erreur lors de l’inscription';
          this.message = '';
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