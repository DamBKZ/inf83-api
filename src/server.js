const app = require('./app');
const { pool } = require('./db');

// Koyeb (et la plupart des plateformes) injectent le port via la variable PORT.
// On la respecte, avec un repli sur 3000 en local.
const PORT = process.env.PORT || 3000;

// Schema initial applique au demarrage (idempotent).
async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS items (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 0
    );
  `);
}

initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`inf83-api a l'ecoute sur le port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Echec de l\'initialisation de la base de donnees :', err.message);
    process.exit(1);
  });
