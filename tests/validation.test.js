const { validerItem } = require('../src/validation');

describe('validerItem', () => {
  test('accepte un item valide', () => {
    expect(validerItem({ name: 'Cafe', quantity: 3 })).toEqual([]);
  });

  test('accepte un item sans quantity (defaut 0)', () => {
    expect(validerItem({ name: 'The' })).toEqual([]);
  });

  test('rejette un name manquant', () => {
    expect(validerItem({ quantity: 3 }).length).toBeGreaterThan(0);
  });

  test('rejette une quantity negative', () => {
    expect(validerItem({ name: 'The', quantity: -1 }).length).toBeGreaterThan(0);
  });

  test('rejette un corps invalide', () => {
    expect(validerItem(null).length).toBeGreaterThan(0);
  });
});
