const request = require('supertest');
const app = require('../src/app');

// Ces tests n'ont PAS besoin d'une base PostgreSQL : la route /health est une
// simple liveness. Cela permet de faire tourner le pipeline CI sans service DB.
describe('GET /health', () => {
  test('repond 200 avec status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});
