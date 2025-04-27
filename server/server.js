// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const db = require('./config/db');

// ⬇️ On importe les routes
const authRoutes = require('./routes/authRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();
const PORT = process.env.PORT || 5050;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// ⬇️ On utilise les routes
app.use('/api', authRoutes);         // localhost:5050/api/register, /api/login
app.use('/api/reviews', reviewRoutes); // localhost:5050/api/reviews/

// Démarrage serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
