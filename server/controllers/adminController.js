const Work = require('../models/Work');

const addGame = async (req, res) => {
  try {
    const {
      name,
      genre,
      description,
      rating,
      imageUrl,
      minPlayers,
      maxPlayers,
      duration,
      age
    } = req.body;

    const newGame = new Work({
      name,
      genre,
      description,
      rating,
      imageUrl,
      minPlayers,
      maxPlayers,
      duration,
      age
    });

    await newGame.save();
    res.status(201).json({ message: 'Jeu ajouté avec succès', game: newGame });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de l\'ajout du jeu' });
  }
};

module.exports = { addGame };
