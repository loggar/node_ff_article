import repository from '../persistence/article.dao';

class ArticleService {
  constructor() {
    this.repository = repository;
  }

  save(article) {
    this.repository.persist(article);
  }

  search(filter = { tag: '', date: '' }) {
    if (!filter.tag || !filter.date) {
      throw new Error('missing search conditions');
    }

    const articles = this.repository.retrieve(filter);

    const ids = [];
    const tags = new Set([]);
    articles.forEach((o) => {
      ids.push(o.id);
      tags.add(...o.tags);
    });

    return {
      tag: filter.tag,
      count: articles.length,
      articles: [...new Set(ids)].sort((a, b) => a - b).slice(-10), // remove duplicates, sort ascending order, last 10 items
      related_tags: [...tags],
    };
  }
}

const instance = new ArticleService();

export default instance;
