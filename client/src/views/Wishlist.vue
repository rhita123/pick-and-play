

<template>
  <div class="wishlist">
    <h1>Ma Wishlist</h1>
    <pre>{{ games }}</pre>
    <div v-if="games.length === 0">
      <p>Aucun jeu dans votre wishlist.</p>
    </div>
    <div v-else class="game-list">
      <div v-for="game in games" :key="game.ID_Jeu" class="game-card">
        <img :src="game.Image" :alt="game.Nom" />
        <h3>{{ game.Nom }}</h3>
        <p>Note : {{ game.Note_moyenne }}/10</p>
        <router-link :to="'/work/' + game.ID_Jeu">Voir détails</router-link>
        <button @click="removeFromWishlist(game.ID_Jeu)">Retirer</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Wishlist',
  data() {
    return {
      games: []
    };
  },
  methods: {
    async fetchWishlist() {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5050/wishlist', {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.games = res.data;
      } catch (err) {
        console.error('Erreur récupération wishlist :', err);
      }
    },
    async removeFromWishlist(id) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5050/wishlist/delete/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.fetchWishlist();
      } catch (err) {
        console.error('Erreur suppression wishlist :', err);
      }
    }
  },
  mounted() {
    this.fetchWishlist();
  }
};
</script>

<style scoped>
.wishlist {
  text-align: center;
  padding: 20px;
}

.game-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.game-card {
  width: 200px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  background: #f9f9f9;
  text-align: center;
}

.game-card img {
  width: 100%;
  height: auto;
  border-radius: 4px;
}

button {
  margin-top: 10px;
  background-color: #ef5350;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #c62828;
}
</style>