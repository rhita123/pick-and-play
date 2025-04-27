<template>
    <div class="works">
      <h1>Films & Séries Populaires</h1>
      <div class="work-cards">
        <div v-for="work in works" :key="work.id" class="work-card">
          <img :src="work.image" :alt="work.title">
          <h2>{{ work.title }}</h2>
          <router-link :to="`/work/${work.id}`" class="detail-link">Voir Détail</router-link>
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
        works: [
          { id: 1, title: 'Breaking Bad', image: breakingbad },
          { id: 2, title: 'Inception', image: inception },
          { id: 3, title: 'The Dark Knight', image: darkknight },
        ]
      }
    }
  }
  </script>
  
  
  <style scoped>
.works {
  text-align: center;
  padding: 100px 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.works h1 {
  font-size: 2.5rem;
  margin-bottom: 40px;
  color: #222;
}

.work-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
}

.work-card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 20px;
  width: 250px;
  text-align: center;
  transition: transform 0.3s;
}

.work-card:hover {
  transform: translateY(-5px);
}

.work-card img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
}

.work-card h2 {
  font-size: 1.5rem;
  margin: 15px 0;
}

.detail-link {
  color: #ff5733;
  font-weight: bold;
  text-decoration: none;
  margin-top: 10px;
  display: inline-block;
}

.detail-link:hover {
  text-decoration: underline;
}
</style>
