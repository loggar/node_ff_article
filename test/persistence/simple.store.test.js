import dataStore from '../../src/persistence/simple.store';
import mock from '../mock/article.mock-generator';
import bulkMockData from '../../mock/articles/articles.mock.json';

describe('datastore', () => {
  beforeEach(() => {
    dataStore.clear();
  });

  it('should contain no article item after clear', () => {
    expect(dataStore.getAll().length).toBe(0);
  });

  it('should contain the article added', () => {
    dataStore.add(mock(1, '2022-08-18'));

    expect(dataStore.getAll().length).toBe(1);

    const article = dataStore.getById('1');
    expect(article.id).toEqual('1');
    expect(article.date).toEqual('2022-08-18');
  });
});

describe('add', () => {
  beforeEach(() => {
    dataStore.clear();
  });

  it('should throw error when id already exists', () => {
    dataStore.add(mock(1, '2022-08-18'));
    expect(() => dataStore.add(mock(1, '2022-08-19'))).toThrow(
      'id already exists'
    );
  });
});

describe('getById', () => {
  it('given missing id as argument, should throw error', () => {
    expect(() => dataStore.getById()).toThrow('invalid parameter');
  });
});

describe('getByTagsAndDate', () => {
  beforeEach(() => {
    dataStore.clear();
    bulkMockData.forEach((o) => dataStore.add(o));
  });

  it('given no arguments, should return all articles', () => {
    const allArticles = dataStore.getAll();
    expect(allArticles.length).toBe(1000);
    expect(dataStore.getByTagsAndDate()).toEqual(allArticles);
  });

  it('given tag and date as arguments, should return filtered articles by given tag and date', () => {
    const tag = 'fitness';
    const date = '2022-08-20';

    const filtered = dataStore.getByTagsAndDate(tag, date);
    expect(filtered.length).toBe(20);

    const expected = bulkMockData.filter(
      (o) => o.date === date && o.tags.includes(tag)
    );
    expect(filtered).toEqual(expected);
  });

  it('given tag or date as arguments, should return filtered articles by given tag and date', () => {
    const tag = 'fitness';
    const date = '2022-08-20';

    expect(dataStore.getByTagsAndDate(tag, undefined).length).toBe(247);
    expect(dataStore.getByTagsAndDate(undefined, date).length).toBe(100);
  });
});
