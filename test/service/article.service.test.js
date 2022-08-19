import articleDao from '../../src/persistence/article.dao';
import articleService from '../../src/service/article.service';
import articleMock from '../mock/article.mock-generator';
import bulkMockData from '../../mock/articles/articles.mock.json';
import expectedSearchResult1 from './article.service.search.result.1.json';
import expectedSearchResult2 from './article.service.search.result.2.json';

const article = articleMock(1, '2022-08-19');

describe('save', () => {
  beforeEach(() => {
    articleDao.clear();
  });

  it('should throw error when id already exists', () => {
    articleService.save(article);
    expect(() => articleService.save(article)).toThrow('id already exists');
  });
});

describe('search', () => {
  beforeEach(() => {
    articleDao.clear();
    bulkMockData.forEach((o) => articleService.save(o));
  });

  it('given missing tag or date as arguments, should throw error', () => {
    expect(() => articleService.search()).toThrow('missing search conditions');
    expect(() => articleService.search({ tag: 'fitness' })).toThrow(
      'missing search conditions'
    );
    expect(() => articleService.search({ date: '2022-08-20' })).toThrow(
      'missing search conditions'
    );
  });

  it('given tag and date as arguments, should return valid search result', () => {
    expect(
      articleService.search({
        tag: 'media',
        date: '1977-08-28',
      })
    ).toEqual({
      tag: 'media',
      count: 0,
      articles: [],
      related_tags: [],
    });

    expect(
      articleService.search({
        tag: 'fitness',
        date: '2022-08-20',
      })
    ).toEqual(expectedSearchResult1);

    expect(
      articleService.search({
        tag: 'media',
        date: '2022-08-21',
      })
    ).toEqual(expectedSearchResult2);
  });
});
