class SimpleDataStore {
  constructor() {
    this.articles = [];
  }

  clear() {
    this.articles = [];
  }

  /**
   * Add an article object (cloned) to datastore
   * @param {object} article `{
   *  id: string,
   *  title: string,
   *  date: string,
   *  body: string,
   *  tags: array,
   * }`
   */
  add(article) {
    if (this.articles.find((o) => o.id === article.id)) {
      throw new Error('id already exists');
    }

    this.articles.push({ ...article });
  }

  /**
   * Get an article by id
   * @param { string } id
   * @returns article | undefined
   */
  getById(id = '') {
    if (!id) {
      throw new Error('invalid parameter');
    }
    return this.articles.find((o) => o.id === id);
  }

  /**
   * Get all articles (cloned) from datastore
   * @returns {array}
   */
  getAll() {
    return [...this.articles];
  }

  /**
   * Get filtered articles by tag and date from datastore
   * @param {string} tag
   * @param {string} date
   * @returns {array}
   */
  getByTagsAndDate(tag = '', date = '') {
    if (!tag && !date) return this.getAll();

    const byDate = date
      ? this.articles.filter((o) => o.date === date)
      : this.articles;

    if (tag) {
      return [...byDate.filter((o) => o.tags.includes(tag))];
    }

    return [...byDate];
  }
}

const instance = new SimpleDataStore();

export default instance;
