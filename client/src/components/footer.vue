<template>
    <footer class="footer">
      <div class="footer-content">
        <img src="../assets/logo.png" alt="Cocktail App Logo" class="footer-logo" />
        <div class="footer-text">
          <p>Address: 123 Cocktail Lane, Mixology City</p>
          <p>© 2024 Cocktail App. All rights reserved.</p>
          <p>
            <a href="https://www.linkedin.com" target="_blank">LinkedIn</a> |
            <a href="https://www.twitter.com" target="_blank">Twitter</a> |
            <a href="https://www.instagram.com" target="_blank">Instagram</a>
          </p>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'Footer',
  };
  </script>
  
  <style scoped>
  .footer {
    background-color: #f5f5f5;
    color: #333;
    padding: 20px;
    text-align: center;
    font-size: 0.9em;
    border-top: 1px solid #ddd;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  
  .footer-content {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  
  .footer-logo {
    width: 80px; /* Adjust the size of the logo as needed */
    margin-bottom: 10px;
  }
  
  .footer-text p {
    margin: 5px 0;
  }
  
  .footer a {
    color: #42b983;
    text-decoration: none;
    margin: 0 5px;
  }
  
  .footer a:hover {
    text-decoration: underline;
  }
  </style>
  