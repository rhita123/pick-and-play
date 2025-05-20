<template>
  <div class="work-details">
    <img :src="work.Image" :alt="work.Nom" class="poster" loading="lazy" />
    <h1>{{ work.Nom }}</h1>

    <div class="rating">
      Note moyenne : {{ work.Note_moyenne }}/10
    </div>

    <p>{{ work.Description }}</p>
    <p><strong>Nombre de joueurs :</strong> {{ work.Min_Joueurs }} à {{ work.Max_Joueurs }}</p>
    <p><strong>Durée :</strong> {{ work.Duree }}</p>
    <p><strong>Âge :</strong> {{ work.Age }}</p>

    <div class="note-form">
      <h3>Noter ce jeu</h3>
      <form @submit.prevent="submitNote">
        <label for="note">Votre note (0 à 10) :</label>
        <input type="number" id="note" v-model.number="newNote" min="0" max="10" step="0.1" required />
        <button type="submit">Envoyer</button>
      </form>
    </div>

    <router-link to="/works" class="back-button">← Retour au catalogue</router-link>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'WorkDetails',
  data() {
    return {
      work: {},
      newNote: null,
    };
  },
  methods: {
    async fetchWork() {
      try {
        const response = await axios.get(`http://localhost:5050/jeux/${this.$route.params.id}`);
        this.work = response.data;
      } catch (error) {
        console.error('Erreur chargement du jeu :', error);
      }
    },
    async submitNote() {
      try {
        const token = localStorage.getItem('token');
        await axios.post(
          `http://localhost:5050/jeux/${this.$route.params.id}/note`,
          { note: this.newNote },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert('Merci pour votre note !');
        this.fetchWork(); // rafraîchit la note moyenne
        this.newNote = null;
      } catch (error) {
        console.error("Erreur lors de l'envoi de la note :", error);
        alert("Une erreur est survenue.");
      }
    },
  },
  mounted() {
    this.fetchWork();
  }
};
</script>

<style scoped>
.work-details {
  text-align: center;
  padding: 40px 20px;
  background-color: white;
  color: #263238;
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
  font-size: 1.4rem;
  color: #fbc02d; /* bright yellow */
  font-weight: bold;
}

p {
  max-width: 600px;
  margin: 0 auto 10px auto;
  font-size: 1.1rem;
  color: #263238;
}

strong {
  color: #1565c0;
  font-weight: bold;
}

.back-button {
  display: inline-block;
  margin-top: 30px;
  padding: 10px 20px;
  background-color: #607d8b;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.back-button:hover {
  background-color: #455a64;
}
</style>

.note-form {
  margin-top: 30px;
  background-color: #f0f4f8;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.note-form h3 {
  color: #fbc02d;
  margin-bottom: 10px;
}

.note-form label {
  color: #1565c0;
  font-weight: bold;
}

.note-form input[type="number"] {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 10px;
  border: 1px solid #90a4ae;
  border-radius: 4px;
}

.note-form button {
  background-color: #4fc3f7;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.note-form button:hover {
  background-color: #0288d1;
}