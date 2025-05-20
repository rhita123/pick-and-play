

<template>
  <div class="admin-dashboard">
    <h1>Tableau de bord Admin</h1>

    <div v-if="games.length === 0">Aucun jeu disponible.</div>

    <table v-else>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Genre</th>
          <th>Note</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="jeu in games" :key="jeu.ID_Jeu">
          <td>{{ jeu.Nom }}</td>
          <td>{{ jeu.Genre }}</td>
          <td>{{ jeu.Note_moyenne }}</td>
          <td>
            <button @click="deleteGame(jeu.ID_Jeu)">Supprimer</button>
            <button @click="editGame(jeu)">Modifier</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="selectedGame">
      <h3>Modifier le jeu</h3>
      <form @submit.prevent="updateGame">
        <input v-model="selectedGame.Nom" placeholder="Nom" required />
        <input v-model="selectedGame.Genre" placeholder="Genre" required />
        <input v-model="selectedGame.Note_moyenne" type="number" step="0.1" placeholder="Note moyenne" required />
        <input v-model="selectedGame.Url" placeholder="URL" />
        <input v-model="selectedGame.Image" placeholder="Image" />
        <input v-model="selectedGame.Min_Joueurs" type="number" placeholder="Min joueurs" />
        <input v-model="selectedGame.Max_Joueurs" type="number" placeholder="Max joueurs" />
        <input v-model="selectedGame.Duree" placeholder="Durée" />
        <input v-model="selectedGame.Age" placeholder="Âge" />
        <button type="submit">Enregistrer</button>
        <button type="button" @click="selectedGame = null">Annuler</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AdminDashboard',
  data() {
    return {
      games: [],
      selectedGame: null
    };
  },
  methods: {
    fetchGames() {
      axios.get('http://localhost:5050/jeux')
        .then(res => this.games = res.data)
        .catch(err => console.error(err));
    },
    deleteGame(id) {
      const token = localStorage.getItem('token');
      axios.delete(`http://localhost:5050/admin/jeux/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => this.fetchGames())
      .catch(err => console.error(err));
    },
    editGame(jeu) {
      this.selectedGame = { ...jeu };
    },
    updateGame() {
      const token = localStorage.getItem('token');
      axios.put(`http://localhost:5050/admin/jeux/${this.selectedGame.ID_Jeu}`, this.selectedGame, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        this.selectedGame = null;
        this.fetchGames();
      })
      .catch(err => console.error(err));
    }
  },
  mounted() {
    this.fetchGames();
  }
};
</script>

<style scoped>
.admin-dashboard {
  padding: 20px;
}
table {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-radius: 6px;
  overflow: hidden;
}
th {
  background: #f5f5f5;
  text-align: left;
}
button {
  margin-right: 8px;
  background-color: #1976d2;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #1565c0;
}
</style>