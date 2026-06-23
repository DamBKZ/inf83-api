const { Pool } = require('pg');

// La chaine de connexion est TOUJOURS injectee au runtime via DATABASE_URL.
// On ne la code jamais en dur : c'est ce qui permet de changer de base
// entre dev, staging et prod sans rebuild de l'image.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = { pool };
