import mock from './article.mock-generator';

const tags = mock.__get__('tags');
const getRandomNumber = mock.__get__('getRandomNumber');
const getRandomTags = mock.__get__('getRandomTags');

describe('article mock-generator', () => {
  const dates = [
    '2022-08-18',
    '2022-08-19',
    '2022-08-20',
    '2022-08-21',
    '2022-08-22',
  ];

  let id = 1;

  it.each(dates)('given %p, should return a valid article object', (date) => {
    [...Array(100)].forEach(() => {
      const article = mock(id, date);
      expect(article).not.toBe(undefined);
      expect(article).toBeInstanceOf(Object);
      expect(article.id).toEqual(id.toString());
      expect(typeof article.title).toBe('string');
      expect(article.date).toEqual(date);
      expect(typeof article.body).toBe('string');
      expect(article.tags).toBeInstanceOf(Array);
      id += 1;
    });
  });

  it('should return a valid article object {id: "1", date: "", ...}', () => {
    const article = mock();
    expect(article).not.toBe(undefined);
    expect(article).toBeInstanceOf(Object);
    expect(article.id).toEqual('1');
    expect(typeof article.title).toBe('string');
    expect(article.date).toEqual('');
    expect(typeof article.body).toBe('string');
    expect(article.tags).toBeInstanceOf(Array);
  });
});

describe('unexported functions', () => {
  // check unexported function for test-coverage
  it('should be testable during unit-test', () => {
    expect(tags).toBeInstanceOf(Array);
    expect(getRandomNumber).toBeInstanceOf(Function);
    expect(getRandomTags).toBeInstanceOf(Function);
  });
});

describe('getRandomNumber', () => {
  it('should return an int number in given range', () => {
    Array.from(Array(1000).keys())
      .map((i) => i + 1)
      .forEach((i) => {
        const num = getRandomNumber(1, i);
        expect(num >= 1 && num <= i).toBeTruthy();
      });
  });

  it('should return an int number 1 when missing args', () => {
    expect(getRandomNumber()).toBe(1);
  });
});

describe('getRandomTags', () => {
  it('should return tag items in given range', () => {
    [...Array(1000)].forEach(() => {
      const mockTags = getRandomTags(getRandomNumber(0, tags.length));
      expect(mockTags.length <= tags.length).toBeTruthy();
    });

    const mockTagsMax = getRandomTags(tags.length);
    expect(mockTagsMax.length <= tags.length).toBeTruthy();
  });

  it('should return tag items in tags range when missing arg', () => {
    const mockTagsMissingRange = getRandomTags();
    expect(mockTagsMissingRange.length <= tags.length).toBeTruthy();
  });
});
