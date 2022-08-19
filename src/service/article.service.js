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
      articles: [...new Set(ids)],
      related_tags: [...tags],
    };
  }
}

const instance = new ArticleService();

export default instance;
