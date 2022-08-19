import dataStore from './simple.store';

class ArticleRepository {
  constructor() {
    this.store = dataStore;
  }

  clear() {
    this.store.clear();
  }

  persist(article) {
    this.store.add(article);
  }

  retrieve(filter = { tag: '', date: '' }) {
    return this.store.getByTagsAndDate(filter.tag, filter.date);
  }
}

const instance = new ArticleRepository();

export default instance;
