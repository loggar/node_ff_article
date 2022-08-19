import dao from '../../src/persistence/article.dao';
import mock from '../mock/article.mock-generator';
import bulkMockData from '../../mock/articles/articles.mock.json';

const article = mock(1, '2022-08-19');

describe('persist', () => {
  beforeEach(() => {
    dao.clear();
  });

  it('should throw error when id already exists', () => {
    dao.persist(article);
    expect(() => dao.persist(article)).toThrow('id already exists');
  });
});

describe('retrieve', () => {
  beforeEach(() => {
    dao.clear();
  });

  it('should return an empty articles after clear', () => {
    expect(dao.retrieve()).toEqual([]);
  });

  it('should return articles which contains the article added', () => {
    dao.persist(article);
    const articles = dao.retrieve();
    expect(articles.length).toBe(1);
    expect(articles[0]).toEqual(article);
  });
});

describe('retrieve', () => {
  beforeEach(() => {
    dao.clear();
    bulkMockData.forEach((o) => dao.persist(o));
  });

  it('given no arguments, should return all articles', () => {
    expect(dao.retrieve()).toEqual(bulkMockData);
  });

  it('given tag and date as arguments, should return filtered articles', () => {
    const tag = 'fitness';
    const date = '2022-08-20';

    const filtered = dao.retrieve({ tag, date });
    expect(filtered.length).toBe(20);

    const expected = dao
      .retrieve()
      .filter((o) => o.date === date && o.tags.includes(tag));
    expect(filtered).toEqual(expected);
  });
});
