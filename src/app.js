const express = require('express');
const { pool } = require('./db');
const { validerItem } = require('./validation');

const app = express();
app.use(express.json());

// Liveness : ne depend PAS de la base. C'est la route que la plateforme
// (Koyeb, Render...) interroge pour savoir si le conteneur est vivant.
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Readiness : verifie l'acces reel a PostgreSQL (utile pour diagnostiquer).
app.get('/ready', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.status(200).json({ status: 'ready' });
  } catch (err) {
    res.status(503).json({ status: 'unavailable' });
  }
});

// Route metier : lit les items en base.
app.get('/items', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, name, quantity FROM items ORDER BY id'
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Erreur base de donnees' });
  }
});

// Route metier : cree un item en base apres validation.
app.post('/items', async (req, res) => {
  const errors = validerItem(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const { name, quantity = 0 } = req.body;
    const { rows } = await pool.query(
      'INSERT INTO items (name, quantity) VALUES ($1, $2) RETURNING id, name, quantity',
      [name, quantity]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erreur base de donnees' });
  }
});

module.exports = app;
