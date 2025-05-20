<template>
    <div class="work-list">
      <h1>Catalogue des jeux</h1>
  
      <!-- Barre de recherche et filtre -->
      <div class="filters">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Rechercher un jeu..."
        />
        <select v-model="minRating">
          <option value="0">Toutes les notes</option>
          <option value="5">Note ≥ 5</option>
          <option value="7">Note ≥ 7</option>
          <option value="9">Note ≥ 9</option>
        </select>
      </div>
  
      <!-- Liste des œuvres filtrées -->
     
        <div class="work-grid">
          <div v-for="work in filteredWorks" :key="work.ID_Jeu" class="work-card">
            <img :src="work.Image" :alt="work.Nom" loading="lazy" />
            <h2>{{ work.Nom }}</h2>
            <p class="rating">Note : {{ work.Note_moyenne }}/10</p>
            <router-link :to="`/work/${work.ID_Jeu}`" class="details-button">
              Voir les détails →
            </router-link>
            <button class="wishlist-button" @click="addToWishlist(work.ID_Jeu)">Ajouter à la wishlist</button>
            <button class="louer-button" @click="louerJeu(work.ID_Jeu)">Louer ce jeu</button>
          </div>
        </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    name: 'WorkList',
    data() {
      return {
        searchQuery: '',
        minRating: 0,
        works: []
      }
    },
    computed: {
      filteredWorks() {
        return this.works.filter(work => {
          const matchesTitle = work.Nom.toLowerCase().includes(this.searchQuery.toLowerCase());
          const matchesRating = work.Note_moyenne >= this.minRating;
          return matchesTitle && matchesRating;
        });
      }
    },
    methods: {
      fetchWorks() {
        axios.get('http://localhost:5050/jeux')
          .then(response => {
            this.works = response.data;
          })
          .catch(error => {
            console.error('Erreur lors de la récupération des jeux :', error);
          });
      },
      addToWishlist(id) {
        alert("Jeu ajouté à la wishlist !");
      },
      louerJeu(id) {
        axios.patch(`http://localhost:5050/jeux/${id}/louer`, {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(() => {
          alert("Le jeu a bien été loué !");
          this.fetchWorks(); // met à jour l'affichage
        })
        .catch(err => {
          alert("Erreur lors de la location du jeu.");
          console.error(err);
        });
      }
    },
    mounted() {
      this.fetchWorks();
    },
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

  .wishlist-button {
    display: inline-block;
    margin-top: 10px;
    background-color: #3b82f6;
    color: #fff;
    padding: 8px 15px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    font-weight: bold;
  }

  .wishlist-button:hover {
    background-color: #2563eb;
  }

  .louer-button {
    display: inline-block;
    margin-top: 10px;
    background-color: #10b981;
    color: #fff;
    padding: 8px 15px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    font-weight: bold;
  }

  .louer-button:hover {
    background-color: #059669;
  }
  </style>