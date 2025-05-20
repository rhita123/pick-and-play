<template>
  <div class="home">
    <video autoplay muted loop playsinline class="background-video">
      <source src="/videos/background-jeux.mp4" type="video/mp4" />
      Votre navigateur ne supporte pas les vidéos HTML5.
    </video>

    <div class="overlay">
      <div class="content">
        <h1>Bienvenue sur <span>Pick&Play</span> 🎲</h1>
        <p>Explorez un monde de jeux de société, partagez vos avis et organisez vos soirées ludiques !</p>
        <router-link to="/works" class="cta-button">Découvrir les jeux</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.home {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  font-family: 'Arial', sans-serif;
}

/* Vidéo de fond */
.background-video {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  object-position: center center;
  z-index: -1;
  pointer-events: none; /* pour éviter les bugs clics */
}

/* Couche assombrie */
.overlay {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Contenu centré */
.content {
  text-align: center;
  color: #fff;
  padding: 3rem 2rem;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  animation: fadeIn 1.5s ease-in;
  max-width: 700px;
}

.content h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.content h1 span {
  color: #ffcc00;
}

.content p {
  font-size: 1.3rem;
  margin-bottom: 2rem;
}

.cta-button {
  background-color: #ffcc00;
  color: #000;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.cta-button:hover {
  background-color: #ffdd33;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .content h1 {
    font-size: 2rem;
  }
  .content p {
    font-size: 1rem;
  }
}
</style>
