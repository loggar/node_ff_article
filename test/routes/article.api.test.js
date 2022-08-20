import supertest from 'supertest';

import app from '../../src/app';

test('POST /articles', async () => {
  await supertest(app)
    .post('/articles')
    .send({
      article: {
        id: '587',
        title:
          'Consectetur officia Lorem consequat et adipisicing minim ex et.',
        date: '2022-08-24',
        body: 'Esse non adipisicing magna fugiat fugiat reprehenderit. Ea eu sint in. Velit eiusmod cupidatat id dolore do quis do dolore.',
        tags: ['economy', 'fitness'],
      },
    })
    .expect(200)
    .then((response) => {
      expect(response.body).toEqual({
        id: '587',
      });
    });
});

test('POST /articles', async () => {
  await supertest(app)
    .post('/articles')
    .send({
      article: {
        id: '587',
        title: '',
        date: '2022-13-32',
        body: '',
        tags: 1,
      },
    })
    .expect(500);
});

test('GET /articles/{id}', async () => {
  await supertest(app)
    .get('/articles/1')
    .expect(500)
    .then((response) => {
      expect(response.body.message).toEqual('could not find article');
    });
});
