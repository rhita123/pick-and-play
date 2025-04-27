<template>
    <div class="work-details">
      <img :src="work.image" :alt="work.title" class="poster" />
      <h1>{{ work.title }}</h1>
      <div class="rating">
        <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= work.rating }">★</span>
      </div>
      <p>{{ work.description }}</p>
  
      <router-link to="/works" class="back-button">← Retour aux Films & Séries</router-link>
  
      <!-- Section Commentaires -->
      <div class="comments">
        <h2>Commentaires</h2>
  
        <div v-if="comments.length === 0" class="no-comments">Aucun commentaire pour le moment.</div>
  
        <ul>
          <li v-for="(comment, index) in comments" :key="index">{{ comment }}</li>
        </ul>
  
        <form @submit.prevent="addComment">
          <input
            type="text"
            v-model="newComment"
            placeholder="Écrire un commentaire..."
            required
          />
          <button type="submit">Ajouter</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import breakingbad from '../assets/breakingbad.jpg'
  import inception from '../assets/inception.jpg'
  import darkknight from '../assets/darkknight.jpg'
  
  export default {
    name: 'WorkDetails',
    data() {
      return {
        newComment: '',
        comments: [],
        works: [
          {
            id: 1,
            title: 'Breaking Bad',
            image: breakingbad,
            description: "Walter White, un professeur de chimie atteint d'un cancer, devient fabricant de méthamphétamine.",
            rating: 5
          },
          {
            id: 2,
            title: 'Inception',
            image: inception,
            description: "Un voleur spécialisé dans l'extraction d'informations secrètes doit implanter une idée dans l'esprit d'une cible.",
            rating: 4
          },
          {
            id: 3,
            title: 'The Dark Knight',
            image: darkknight,
            description: "Batman affronte le Joker, un criminel psychopathe qui sème le chaos à Gotham City.",
            rating: 5
          }
        ]
      }
    },
    computed: {
      work() {
        const id = parseInt(this.$route.params.id)
        return this.works.find(w => w.id === id) || {}
      }
    },
    methods: {
      addComment() {
        if (this.newComment.trim() !== '') {
          this.comments.push(this.newComment.trim())
          this.newComment = ''
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .work-details {
    text-align: center;
    padding: 40px 20px;
  }
  
  .poster {
    max-width: 300px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    margin-bottom: 20px;
  }
  
  h1 {
    font-size: 2rem;
    margin-bottom: 10px;
  }
  
  .rating {
    margin-bottom: 20px;
  }
  
  .star {
    font-size: 2rem;
    color: #ccc;
  }
  
  .star.filled {
    color: gold;
  }
  
  p {
    max-width: 600px;
    margin: 0 auto 30px auto;
    font-size: 1.2rem;
    color: #555;
  }
  
  .back-button {
    display: inline-block;
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #f25c3b;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    font-weight: bold;
  }
  
  .back-button:hover {
    background-color: #e04b2d;
  }
  
  /* Comments Section */
  .comments {
    margin-top: 40px;
    text-align: left;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .comments h2 {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }
  
  .no-comments {
    font-style: italic;
    color: #999;
    margin-bottom: 15px;
  }
  
  .comments ul {
    list-style-type: none;
    padding: 0;
  }
  
  .comments li {
    background: #f7f7f7;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
  }
  
  form {
    display: flex;
    margin-top: 20px;
  }
  
  form input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px 0 0 5px;
    outline: none;
  }
  
  form button {
    background-color: #f25c3b;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 0 5px 5px 0;
    cursor: pointer;
    font-weight: bold;
  }
  
  form button:hover {
    background-color: #e04b2d;
  }
  </style>
  