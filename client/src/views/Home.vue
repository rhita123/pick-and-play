<template>
    <div class="home">
      
  
      
  
      <!-- Content Section (Text) -->
      <div class="content">
        <h1>Bienvenue sur <span>Popcorn & Opinions</span> 🍿🎬</h1>
        <p>Votre plateforme communautaire pour publier, noter et commenter des films et séries.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Home'
  }
  </script>
  
  <style scoped>
  
  
  /* Navbar */
  .navbar {
    position: absolute;
    top: 0;
    width: 100%;
    padding: 15px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(255, 87, 51, 0.8); /* légère transparence */
    z-index: 10;
  }
  
  .logo-container img.logo {
    height: 50px;
  }
  
  .links {
    display: flex;
    gap: 20px;
  }
  
  .links a {
    color: white;
    font-weight: bold;
    text-decoration: none;
    font-size: 1.1rem;
  }
  
  .links a:hover {
    text-decoration: underline;
  }
  
  /* Content Section */
  .content {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    background-color: rgba(0, 0, 0, 0.4); /* assombrir juste derrière le texte */
    padding: 30px 20px;
    border-radius: 10px;
    color: white;
    z-index: 5;
    animation: fadeIn 2s ease-in;
  }
  
  .content h1 {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  .content h1 span {
    color: #ff5733;
  }
  
  .content p {
    font-size: 1.3rem;
    color: #ddd;
  }
  
  /* Fade-in Animation */
  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translate(-50%, -60%);
    }
    100% {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }
  
  /* Responsive for small screens */
  @media (max-width: 768px) {
    .content h1 {
      font-size: 2rem;
    }
    
    .content p {
      font-size: 1rem;
    }
  
    .links {
      flex-direction: column;
      gap: 10px;
    }
  }
  </style>
  