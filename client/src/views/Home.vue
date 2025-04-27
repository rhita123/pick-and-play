<template>
    <div class="home">
      <h1>Bienvenue sur Popcorn & Opinions 🍿</h1>
      <div class="work-list">
        <div v-for="work in works" :key="work.id" class="work-card">
          <img :src="work.image" :alt="work.title" />
          <h2>{{ work.title }}</h2>
          <p>{{ work.release_year }} - {{ work.type }}</p>
          <p>Note: {{ work.rating }} ⭐️</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import worksData from '@/assets/data/films.json';
  
  export default {
    name: 'Home',
    data() {
      return {
        works: worksData
      };
    }
  };
  </script>
  
  <style scoped>
  .home {
    text-align: center;
  }
  .work-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }
  .work-card {
    width: 200px;
  }
  .work-card img {
    width: 100%;
    height: auto;
  }
  </style>
  