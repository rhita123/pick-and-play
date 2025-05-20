<template>
  <div class="admin-dashboard">
    <h1>Tableau de bord Admin</h1>

    <div class="add-game">
      <h3>Ajouter un nouveau jeu</h3>
      <form @submit.prevent="addGame">
        <div class="form-group">
          <input v-model="newGame.Nom" placeholder="Nom" required />
          <input v-model="newGame.Genre" placeholder="Genre" required />
          <input v-model="newGame.Note_moyenne" type="number" step="0.1" placeholder="Note moyenne" />
          <input v-model="newGame.Description" placeholder="Description" />
          <input v-model="newGame.Url" placeholder="URL" />
          <input v-model="newGame.Image" placeholder="Image" />
          <input v-model="newGame.Min_Joueurs" type="number" placeholder="Min joueurs" />
          <input v-model="newGame.Max_Joueurs" type="number" placeholder="Max joueurs" />
          <input v-model="newGame.Duree" placeholder="Durée" />
          <input v-model="newGame.Age" placeholder="Âge" />
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>

    <div v-if="games.length === 0">Aucun jeu disponible.</div>

    <table v-else>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Genre</th>
          <th>Note</th>
          <th>Min joueurs</th>
          <th>Max joueurs</th>
          <th>Durée</th>
          <th>Âge</th>
          <th>Loué</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="jeu in games" :key="jeu.ID_Jeu">
          <td>{{ jeu.Nom }}</td>
          <td>{{ jeu.Genre }}</td>
          <td>{{ jeu.Note_moyenne }}</td>
          <td>{{ jeu.Min_Joueurs }}</td>
          <td>{{ jeu.Max_Joueurs }}</td>
          <td>{{ jeu.Duree }}</td>
          <td>{{ jeu.Age }}</td>
          <td>{{ jeu.Est_Loue }}</td>
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
        <div class="form-group">
          <input v-model="selectedGame.Nom" placeholder="Nom" required />
          <input v-model="selectedGame.Genre" placeholder="Genre" required />
          <input v-model="selectedGame.Note_moyenne" type="number" step="0.1" placeholder="Note moyenne" required />
          <input v-model="selectedGame.Description" placeholder="Description" />
          <input v-model="selectedGame.Url" placeholder="URL" />
          <input v-model="selectedGame.Image" placeholder="Image" />
          <input v-model="selectedGame.Min_Joueurs" type="number" placeholder="Min joueurs" />
          <input v-model="selectedGame.Max_Joueurs" type="number" placeholder="Max joueurs" />
          <input v-model="selectedGame.Duree" placeholder="Durée" />
          <input v-model="selectedGame.Age" placeholder="Âge" />
        </div>
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
      selectedGame: null,
      newGame: {
        Nom: '',
        Genre: '',
        Note_moyenne: 0,
        Description: '',
        Url: '',
        Image: '',
        Min_Joueurs: null,
        Max_Joueurs: null,
        Duree: '',
        Age: ''
      }
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
    },
    addGame() {
      const token = localStorage.getItem('token');
      axios.post('http://localhost:5050/admin/add-game', this.newGame, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        this.fetchGames();
        this.newGame = {
          Nom: '',
          Genre: '',
          Note_moyenne: 0,
          Description: '',
          Url: '',
          Image: '',
          Min_Joueurs: null,
          Max_Joueurs: null,
          Duree: '',
          Age: ''
        };
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
.add-game {
  margin-bottom: 30px;
}
.add-game form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  background-color: #f0f4f8;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  max-width: 1000px;
  margin-bottom: 30px;
}

.form-group {
  display: contents;
}

.add-game form input {
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
}

.add-game form button {
  grid-column: span 2;
  background-color: #007BFF;
  color: white;
  font-weight: bold;
  padding: 10px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}
.add-game form button:hover {
  background-color: #0056b3;
}

table th, table td {
  padding: 8px;
  font-size: 0.95rem;
}

th, td {
  white-space: nowrap;
}
</style>