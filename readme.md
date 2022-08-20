# Technical Test

- [Technical test details and submissions](#technical-test-details-and-submissions)
- [System requirements](#system-requirements)
- [Installation and running application](#installation-and-running-application)
- [Project requirements](#project-requirements)
- [Assumptions](#assumptions)
- [Solutions](#solutions)
- [Project Timetable](#project-timetable)
- [Other items](#other-items)

## Technical test details and submissions

The technical test details are provided by: ~~the-given-url-page~~.
The project including this document will be submitted to: ~~the-given-email-address~~, and a github public repository:

- [https://github.com/loggar/node_ff_article.git](https://github.com/loggar/node_ff_article.git)

## System requirements

- Node,js (v16.15.1 or above) [download](https://nodejs.org/en/download/)
- Git

## Installation and running application

Clone repository:

```sh
$ git clone https://github.com/loggar/node_ff_article.git <project-dir>
$ cd <project-dir>
```

Package installation:

```sh
$ npm install
```

Run test:

```sh
$ npm test
```

Run application (development)

```sh
npm run start:dev
```

Build project:

```sh
$ npm run build
```

Run application:

```sh
$ npm start
```

## Project requirements

The project will be a simple HTTP server that contains:

- `POST /articles` save given article
- `GET /articles/{id}` get article by given id
- `GET /tagName/date` get summary report of the articles by given tagName and date

## Assumptions

In data storage, the "id" field of the articles:

- is unique.
- is a string type value which only contains digits.

In data storage, searching articles:

- by date is more performant than by tag name.
- filters articles only by date and tag name.

Article application

- does not require api authentication
- dees not persist storage data in disk for future use
- does not require deploying or monitoring server
- will be running on development environment

## Solutions

For building Article application, I

- mainly focused on fulfilling the requirements.
- set up `eslint`, `prettier` for code formatting and code linting.
- utilised `jest` package for project test setting.
- built a mock article generator.
- created a simple data store that provides features for saving/filtering articles.
- created an isolated/divided repository module for further extension of the persistent layer.
- built business logic in service layer.
- built http server app based on `express.js`.
- built input article validator for `POST /articles` body validation.
- implemented a simple `node.js` error handling flow.
- used `express.js` error handler for http error response.

### Business logic - `/tags/{tagName}/{date}` article summary report:

I filtered articles by date and tag name, counted the result article items (`count`), sorted articles id list and selected the last 10 items (`articles`).
I used `javascript` `Set` type object to remove duplicates from id and tag list.

`src\service\article.service.js` `search()`

```js
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
  articles: [...new Set(ids)].sort((a, b) => a - b).slice(-10),
  related_tags: [...tags],
};
```

### Testing strategy:

I wrote unit test, api test based on `jest` test suite convention, and built them to cover all modules in the application.

```
$ npm test

> tech-challenge-ff-node@0.0.0 test
> jest --coverage --verbose ./test

 PASS  test/mock/article.mock-generator.test.js
  article mock-generator
    √ given "2022-08-18", should return a valid article (145 ms)
    √ given "2022-08-19", should return a valid article (94 ms)
    √ given "2022-08-20", should return a valid article (110 ms)
    √ given "2022-08-21", should return a valid article (120 ms)
    √ given "2022-08-22", should return a valid article (110 ms)
    √ given no arguments, should return a valid article {id: "1", date: "", ...} (2 ms)
  unexported functions
    √ should be testable during unit-test (1 ms)
  getRandomNumber
    √ should return an int number in given range (152 ms)
    √ given no arguments, should return an int number 1
  getRandomTags
    √ should return tag items in given range (176 ms)
    √ given no arguments, should return tag items in tags range (1 ms)

GET /page/not/found 404 10.832 ms - 23
 PASS  test/routes/api.404.test.js
  √ GET 404 page not found (88 ms)

POST /articles 200 68.359 ms - 12
 PASS  test/service/article.service.test.js
  save
    √ should throw error when id already exists (37 ms)
  getOne
    √ given missing id as argument,  (3 ms)
  search
    √ given missing tag or date as arguments, should throw error (37 ms)
    √ given tag and date as arguments, should return valid search result (36 ms)

 PASS  test/persistence/article.dao.test.js
  persist
    √ should throw error when id already exists (31 ms)
  retrieveOne
    √ given missing id as argument, should throw error (6 ms)
    √ given id as argument, should return article (2 ms)
    √ given id as argument, should return article (2 ms)
  retrieve
    √ should return an empty articles after clear (1 ms)
    √ should return articles which contains the article added (2 ms)
    √ given no arguments, should return all articles (106 ms)
    √ given tag and date as arguments, should return filtered articles (35 ms)

POST /articles 500 12.089 ms - 180
GET /articles/1 500 2.777 ms - 36
GET /articles/abc 500 1.206 ms - 32
 PASS  test/routes/article.api.test.js
  √ POST /articles (147 ms)
  √ POST /articles (33 ms)
  √ GET /articles/{id} (16 ms)
  √ GET /articles/{id-not-digits} (9 ms)

 PASS  test/persistence/simple.store.test.js
  datastore
    √ should contain no article item after clear (8 ms)
    √ should contain the article added (7 ms)
  add
    √ should throw error when id already exists (33 ms)
  getById
    √ given missing id as argument, should throw error (2 ms)
  getByTagsAndDate
    √ given no arguments, should return all articles (62 ms)
    √ given tag and date as arguments, should return filtered articles by given tag and date (52 ms)
    √ given tag or date as arguments, should return filtered articles by given tag and date (22 ms)

GET /tags/fitness/20220820 200 14.579 ms - 59
GET /tags/fitness/2022-08-20 500 2.587 ms - 34
GET /tags/fitness/2022-13-31 500 1.023 ms - 34
 PASS  test/routes/tags.api.test.js
  √ GET /tags/{tagName}/{date} (71 ms)
  √ GET /tags/{tagName}/2022-08-20 (16 ms)
  √ GET /tags/{tagName}/2022-13-31 (9 ms)

----------------------------|---------|----------|---------|---------|-------------------
File                        | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------------------------|---------|----------|---------|---------|-------------------
All files                   |     100 |      100 |     100 |     100 |
 src                        |     100 |      100 |     100 |     100 |
  app.js                    |     100 |      100 |     100 |     100 |
 src/persistence            |     100 |      100 |     100 |     100 |
  article.dao.js            |     100 |      100 |     100 |     100 |
  simple.store.js           |     100 |      100 |     100 |     100 |
 src/routes                 |     100 |      100 |     100 |     100 |
  article.validator.js      |     100 |      100 |     100 |     100 |
  articles.api.js           |     100 |      100 |     100 |     100 |
  tags.api.js               |     100 |      100 |     100 |     100 |
 src/service                |     100 |      100 |     100 |     100 |
  article.service.js        |     100 |      100 |     100 |     100 |
 test/mock                  |     100 |      100 |     100 |     100 |
  article.mock-generator.js |     100 |      100 |     100 |     100 |
----------------------------|---------|----------|---------|---------|-------------------
Test Suites: 7 passed, 7 total
Tests:       38 passed, 38 total
Snapshots:   0 total
Time:        5.445 s
Ran all test suites matching /.\\test/i.
```

## Project Timetable

| Task                                                                       | Duration (hours) |
| -------------------------------------------------------------------------- | ---------------- |
| Setting up project (Git, NodeJS, IDE, linter, code-formatter, test-runner) | 2                |
| Setting up Babel, test-coverage                                            | 2                |
| Data access layer implementation (including mock data generation)          | 4                |
| Service logic implementation                                               | 1                |
| Setting up HTTP server packages and REST API endpoint implementation       | 4                |
| HTTP client test                                                           | 1                |
| Submission                                                                 | 2                |

| Delivery | Duration (hours) |
| -------- | ---------------- |
| total    | 16               |

## Other items

Below are what can be further included in the project:

- ~~Babel~~ (included)
- Typescript
- ~~Schema validation of input articles~~ (included)
- Data access object with 3'rd party database systems
- API authentication
- Logging production
- ~~HTTP client request collection~~ (included)
- API documentation
- Environment profiling
- Containerizing production build
- Deployment
