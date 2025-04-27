<template>
    <div>
      <!-- Background Video -->
      <video autoplay muted loop>
        <source src="../assets/cocktail-background.mp4" type="video/mp4" />
      </video>
  
      <!-- Header Section -->
      <header>
        <div class="header-top">
          <h1>Welcome to the Cocktail App</h1>
        </div>
        <nav>
          <router-link to="/">Home</router-link>
          <router-link to="/cocktail/list/all">Cocktails</router-link>
        <router-link to="/restaurant/list/all">Restaurants</router-link>
        <router-link to="/employee/list/all">Employees</router-link>
        <router-link to="/ingredient/list/all">Ingredients</router-link>
        <router-link to="/auth/register">Register</router-link>
        </nav>
      </header>
  
      <!-- Main Content -->
      <main>
        <!-- Featured Cocktails Section -->
        <section id="cocktails">
          <h1>Featured Cocktails</h1>
          <div class="carousel">
            <button @click="prevImage" class="arrow prev">&lt;</button>
            <article>
              <img :src="images[currentImage].src" :alt="images[currentImage].alt" class="active" />
            </article>
            <button @click="nextImage" class="arrow next">&gt;</button>
          </div>
          <p class="caption">{{ images[currentImage].alt }}</p>
        </section>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Accueil',
    data() {
      return {
        currentImage: 0,
        images: [
          { src: require("../assets/mojito.png"), alt: "Mojito" },
          { src: require("../assets/margarita.png"), alt: "Margarita" },
          { src: require("../assets/old-fashioned.png"), alt: "Old Fashioned" },
        ],
      };
    },
    methods: {
      nextImage() {
        this.currentImage = (this.currentImage + 1) % this.images.length;
      },
      prevImage() {
        this.currentImage = (this.currentImage - 1 + this.images.length) % this.images.length;
      },
    },
  };
  </script>
  <style scoped>
  /* Video Background */
  video {
    width: 100%;
    height: auto;
    margin: 0 auto;
    display: block;
  }
  
  /* Header */
  .header-top h1 {
    color: #fff;
    text-align: center;
    margin-top: 20px;
  }
  
  nav {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 10px;
  }
  
  nav a {
    color: #42b983;
    text-decoration: none;
    font-weight: bold;
  }
  
  nav a:hover {
    text-decoration: underline;
  }
  
  /* Main Content */
  main {
    text-align: center;
    margin-top: 20px;
  }
  
  #cocktails {
    margin: 20px 0;
  }
  
  /* Carousel */
  .carousel {
    position: relative;
    max-width: 800px; /* Restrict carousel width */
    height: 500px; /* Set a fixed height for the carousel container */
    margin: 0 auto;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .carousel img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Ensures the image fills the container without stretching */
    display: block;
  }
  
  .carousel .arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: #fff;
    color: #333;
    font-size: 2em;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    width: 40px;
    height: 40px;
  }
  
  .carousel .prev {
    left: 10px;
  }
  
  .carousel .next {
    right: 10px;
  }
  
  .caption {
    font-size: 1.2em;
    color: #333;
    margin-top: 10px;
  }
  </style>
  