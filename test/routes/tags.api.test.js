import supertest from 'supertest';

import app from '../../src/app';

test('GET /tags/{tagName}/{date}', async () => {
  await supertest(app)
    .get('/tags/fitness/20220820')
    .expect(200)
    .then((response) => {
      expect(response.body).toEqual({
        tag: 'fitness',
        count: 0,
        articles: [],
        related_tags: [],
      });
    });
});

test('GET /tags/{tagName}/2022-08-20', async () => {
  await supertest(app)
    .get('/tags/fitness/2022-08-20')
    .expect(500)
    .then((response) => {
      expect(response.body.message).toEqual('invalid format: date');
    });
});

test('GET /tags/{tagName}/2022-13-31', async () => {
  await supertest(app)
    .get('/tags/fitness/2022-13-31')
    .expect(500)
    .then((response) => {
      expect(response.body.message).toEqual('invalid format: date');
    });
});
