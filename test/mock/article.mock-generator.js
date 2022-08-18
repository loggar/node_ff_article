import { LoremIpsum } from 'lorem-ipsum';

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 2,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

const tagCandidates = [
  'economy',
  'education',
  'environment',
  'fitness',
  'food',
  'health',
  'media',
  'politics',
  'science',
  'sports',
  'technology',
];

const tags = Array.from(new Set(tagCandidates));

const getRandomNumber = (min = 1, max = 1) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomTags = (num = 0) => {
  if (tags.length <= num) return [...tags];
  const shuffled = [...tags].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

/**
 * generates a mock article
 * @param { number } id
 * @param { string } date
 * @returns `{
 *   id: "1",
 *   title: "latest science shows that potato chips are better for you than sugar",
 *   date : "2016-09-22",
 *   body : "some text, potentially containing simple markup about how potato chips are great",
 *   tags : ["health", "fitness", "science"]
 * }`
 */
const generate = (id = 1, date = '') => ({
  id: id.toString(),
  title: lorem.generateSentences(1),
  date,
  body: lorem.generateParagraphs(1),
  tags: getRandomTags(getRandomNumber(0, 4)),
});

export default generate;
