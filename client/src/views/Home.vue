<template>
    <div class="home">
      <h1>Bienvenue sur <span>Popcorn & Opinions</span> 🍿🎬</h1>
      <p>Votre plateforme communautaire pour publier, noter et commenter des films et séries.</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Home'
  }
  </script>
  
  <style scoped>
  .home {
    text-align: center;
    padding: 100px 20px;
    background-color: #f5f5f5;
    min-height: 100vh;
  }
  
  .home h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: #333;
  }
  
  .home h1 span {
    color: #ff5733;
  }
  
  .home p {
    font-size: 1.2rem;
    color: #666;
  }
</style>