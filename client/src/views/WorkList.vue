<template>
    <div class="work-list">
      <h1>Films & Séries</h1>
  
      <!-- Barre de recherche et filtre -->
      <div class="filters">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Rechercher un film ou une série..."
        />
        <select v-model="minRating">
          <option value="0">Toutes les notes</option>
          <option value="3">Note ≥ 3</option>
          <option value="4">Note ≥ 4</option>
          <option value="5">Note = 5</option>
        </select>
      </div>
  
      <!-- Liste des œuvres filtrées -->
      <div class="work-grid">
        <div v-for="work in filteredWorks" :key="work.id" class="work-card">
          <img :src="work.image" :alt="work.title" />
          <h2>{{ work.title }}</h2>
          <p class="rating">
            <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= work.rating }">★</span>
          </p>
          <router-link :to="`/work/${work.id}`" class="details-button">
            Voir les détails →
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import breakingbad from '../assets/breakingbad.jpg'
  import inception from '../assets/inception.jpg'
  import darkknight from '../assets/darkknight.jpg'
  
  export default {
    name: 'WorkList',
    data() {
      return {
        searchQuery: '',
        minRating: 0,
        works: [
          {
            id: 1,
            title: 'Breaking Bad',
            image: breakingbad,
            description: "Walter White, professeur de chimie, devient fabricant de méthamphétamine.",
            rating: 5
          },
          {
            id: 2,
            title: 'Inception',
            image: inception,
            description: "Un voleur d'idées doit implanter une pensée dans un rêve.",
            rating: 4
          },
          {
            id: 3,
            title: 'The Dark Knight',
            image: darkknight,
            description: "Batman affronte son ennemi le Joker pour sauver Gotham.",
            rating: 5
          }
        ]
      }
    },
    computed: {
      filteredWorks() {
        return this.works.filter(work => {
          const matchesTitle = work.title.toLowerCase().includes(this.searchQuery.toLowerCase());
          const matchesRating = work.rating >= this.minRating;
          return matchesTitle && matchesRating;
        });
      }
    }
  }
  </script>
  
  <style scoped>
  .work-list {
    text-align: center;
    padding: 40px 20px;
  }
  
  .filters {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-bottom: 30px;
  }
  
  .filters input, .filters select {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  .work-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: center;
  }
  
  .work-card {
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    width: 220px;
    box-shadow: 0px 4px 10px rgba(0,0,0,0.1);
    text-align: center;
  }
  
  .work-card img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 8px;
  }
  
  h2 {
    margin-top: 10px;
    font-size: 1.2rem;
  }
  
  .rating {
    margin: 10px 0;
  }
  
  .star {
    font-size: 1.5rem;
    color: #ccc;
  }
  
  .star.filled {
    color: gold;
  }
  
  .details-button {
    display: inline-block;
    margin-top: 10px;
    background-color: #f25c3b;
    color: #fff;
    padding: 8px 15px;
    border-radius: 5px;
    text-decoration: none;
    font-weight: bold;
  }
  
  .details-button:hover {
    background-color: #e04b2d;
  }
  </style>