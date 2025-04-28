<template>
    <div class="work-details">
      <img :src="work.image" :alt="work.title" class="poster" />
      <h1>{{ work.title }}</h1>
  
      <div class="rating">
        <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= work.rating }">★</span>
      </div>
  
      <p>{{ work.description }}</p>
  
      <!-- Bouton Ajouter une Critique -->
      <router-link :to="`/new-review/${work.id}`" class="add-review-button">
        + Ajouter une Critique
      </router-link>
  
      <router-link to="/works" class="back-button">← Retour aux Films & Séries</router-link>
  
      <!-- Section Critiques -->
      <div class="reviews">
        <h2>Critiques</h2>
  
        <div v-if="reviews.length === 0" class="no-reviews">
          Pas encore de critiques pour ce film.
        </div>
  
        <div v-else>
          <div v-for="(review, index) in reviews" :key="index" class="review-card">
            <h3>{{ review.title }}</h3>
            <p>{{ review.content }}</p>
            <div class="review-rating">
              <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= review.rating }">★</span>
            </div>
  
            <!-- Commentaires liés à cette critique -->
            <div class="comments">
              <h4>Commentaires :</h4>
              <ul>
                <li v-for="(comment, cIndex) in commentsByReviewId[review.id] || []" :key="cIndex">
                  {{ comment.content }}
                </li>
              </ul>
  
              <!-- Formulaire pour ajouter un commentaire -->
              <form @submit.prevent="addComment(review.id)">
                <input
                  type="text"
                  v-model="newComments[review.id]"
                  placeholder="Écrire un commentaire..."
                  required
                />
                <button type="submit">Ajouter</button>
              </form>
            </div>
          </div>
        </div>
      </div>
  
    </div>
  </template>
  
  <script>
  import breakingbad from '../assets/breakingbad.webp'
  import inception from '../assets/inception.webp'
  import darkknight from '../assets/darkknight.webp'
  
  export default {
    name: 'WorkDetails',
    data() {
      return {
        reviews: [],
        comments: [],
        commentsByReviewId: {},
        newComments: {},
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
      async fetchReviews() {
        try {
          const response = await axios.get(`http://localhost:5050/api/reviews/${this.work.id}`);
          this.reviews = response.data;
        } catch (error) {
          console.error('Erreur lors du chargement des critiques :', error);
        }
      },
      async fetchComments() {
        try {
          const response = await axios.get(`http://localhost:5050/api/comments`);
          this.comments = response.data;
  
          // Organiser les commentaires par review_id
          this.commentsByReviewId = {};
          this.comments.forEach(comment => {
            if (!this.commentsByReviewId[comment.review_id]) {
              this.commentsByReviewId[comment.review_id] = [];
            }
            this.commentsByReviewId[comment.review_id].push(comment);
          });
        } catch (error) {
          console.error('Erreur récupération commentaires :', error);
        }
      },
      async addComment(reviewId) {
        const content = this.newComments[reviewId];
  
        if (!content || content.trim() === '') {
          return;
        }
  
        try {
          await axios.post('http://localhost:5050/api/comments', {
            review_id: reviewId,
            user_id: 1, // temporaire
            content: content.trim()
          });
  
          this.newComments[reviewId] = '';
          alert('✅ Commentaire ajouté !');
          this.fetchComments();
        } catch (error) {
          console.error('Erreur ajout commentaire :', error);
          alert('❌ Erreur lors de l’ajout du commentaire');
        }
      }
    },
    mounted() {
      this.fetchReviews();
      this.fetchComments();
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
  
  .add-review-button {
    display: inline-block;
    margin: 15px 10px 0;
    padding: 10px 20px;
    background-color: #ff5733;
    color: white;
    font-weight: bold;
    border-radius: 8px;
    text-decoration: none;
  }
  
  .add-review-button:hover {
    background-color: #e04b2d;
  }
  
  .back-button {
    display: inline-block;
    margin-top: 15px;
    padding: 10px 20px;
    background-color: #666;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    font-weight: bold;
  }
  
  .back-button:hover {
    background-color: #444;
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
  
  /* Reviews Section */
  .reviews {
    margin-top: 50px;
    text-align: center;
  }
  
  .review-card {
    background-color: #fff;
    padding: 20px;
    margin: 20px auto;
    max-width: 600px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0,0,0,0.1);
    text-align: left;
  }
  
  .review-card h3 {
    margin-bottom: 10px;
    color: #f25c3b;
  }
  
  .review-card p {
    margin-bottom: 10px;
    color: #555;
  }
  
  .review-rating {
    margin-top: 10px;
  }
  
  .review-rating .star {
    color: #ccc;
    font-size: 1.5rem;
  }
  
  .review-rating .star.filled {
    color: gold;
  }
  </style>
  