// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');

// ⬇️ On importe les routes

// const reviewRoutes = require('./routes/reviewRoutes');
// const commentRoutes = require('./routes/commentRoutes'); 
const userRoutes = require('./routes/userRoutes');
// const adminRoutes = require('./routes/adminRoutes');
const jeuRoutes = require('./routes/jeuRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5050;

// Middlewares
app.use(cors());

app.use(express.json());

// ⬇️ On utilise les routes

// app.use('/api/reviews', reviewRoutes); // localhost:5050/api/reviews/
// app.use('/api/comments', commentRoutes); // <--- connecter les commentaires
app.use('/api', userRoutes);
// app.use('/admin', adminRoutes);
app.use('/jeux', jeuRoutes);
app.use('/auth', authRoutes);

// Démarrage serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
