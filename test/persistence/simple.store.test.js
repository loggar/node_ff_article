import dataStore from '../../src/persistence/simple.store';
import mock from '../mock/article.mock-generator';

describe('SimpleDataStore', () => {
  beforeEach(() => {
    dataStore.clear();
  });

  it('should contain no article item after clear', () => {
    expect(dataStore.getAll().length).toBe(0);
  });

  it('should contain the article added', () => {
    dataStore.add(mock(1, '2022-08-18'));
    expect(dataStore.getAll().length).toBe(1);
    expect(dataStore.getAll()[0].id).toEqual('1');
    expect(dataStore.getAll()[0].date).toEqual('2022-08-18');
  });

  it('should throw an error when id already exists', () => {
    dataStore.add(mock(1, '2022-08-18'));
    expect(() => dataStore.add(mock(1, '2022-08-19'))).toThrow(
      'id already exists'
    );
  });
});
