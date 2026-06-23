// Validation pure (sans base de donnees) : facile a tester unitairement avec Jest.
function validerItem(body) {
  if (!body || typeof body !== 'object') {
    return ['Corps de requete invalide'];
  }

  const errors = [];

  if (typeof body.name !== 'string' || body.name.trim() === '') {
    errors.push('Le champ "name" est requis');
  }

  if (
    body.quantity !== undefined &&
    (!Number.isInteger(body.quantity) || body.quantity < 0)
  ) {
    errors.push('Le champ "quantity" doit etre un entier positif ou nul');
  }

  return errors;
}

module.exports = { validerItem };
