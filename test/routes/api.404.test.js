import supertest from 'supertest';

import app from '../../src/app';

test('GET 404 page not found', async () => {
  await supertest(app).get('/page/not/found').expect(404);
});
