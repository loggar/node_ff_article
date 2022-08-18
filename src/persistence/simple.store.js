class SimpleDataStore {
  constructor() {
    this.articles = [];
  }

  clear() {
    this.articles = [];
  }

  getAll() {
    return this.articles;
  }

  add(article) {
    if (this.articles.find((ele) => ele.id === article.id)) {
      throw new Error('id already exists');
    }

    this.articles.push(article);
  }
}

const instance = new SimpleDataStore();

export default instance;
