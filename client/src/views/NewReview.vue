<template>
    <div class="new-review">
      <h1>Ajouter une Critique</h1>
  
      <form @submit.prevent="submitReview">
        <div class="form-group">
          <label for="title">Titre de la critique :</label>
          <input type="text" id="title" v-model="title" required />
        </div>
  
        <div class="form-group">
          <label for="content">Contenu :</label>
          <textarea id="content" v-model="content" rows="5" required></textarea>
        </div>
  
        <div class="form-group">
          <label>Note :</label>
          <div class="stars">
            <span
              v-for="n in 5"
              :key="n"
              class="star"
              :class="{ filled: n <= rating }"
              @click="rating = n"
            >★</span>
          </div>
        </div>
  
        <button type="submit">Publier</button>
      </form>
  
      <router-link to="/works" class="back-button">← Retour aux Films & Séries</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: "NewReview",
    data() {
      return {
        title: "",
        content: "",
        rating: 0,
      };
    },
    methods: {
      submitReview() {
        console.log("Nouvelle critique :", {
          title: this.title,
          content: this.content,
          rating: this.rating
        });
  
        alert('Critique envoyée avec succès ! ✅');
  
        // Remettre le formulaire vide
        this.title = "";
        this.content = "";
        this.rating = 0;
      }
    }
  }
  </script>
  
  <style scoped>
  .new-review {
    max-width: 600px;
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
  
  input[type="text"],
  textarea {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  .stars {
    display: flex;
    gap: 10px;
    font-size: 2rem;
    cursor: pointer;
    margin-top: 10px;
  }
  
  .star {
    color: #ccc;
  }
  
  .star.filled {
    color: gold;
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
  
  .back-button {
    display: block;
    text-align: center;
    margin-top: 20px;
    color: #ff5733;
    font-weight: bold;
    text-decoration: none;
  }
  
  .back-button:hover {
    text-decoration: underline;
  }
  </style>
  
  