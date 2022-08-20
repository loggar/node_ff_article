# Technical Test (Nine)

## Technical test details and submissions

The technical test details is provided from: ~~the-given-url-page~~.

The project including this document will be submitted to: ~~the-given-email-address~~.

## Repository

Public repository favoured

## System requirements

- Node,js (v16.15.1 or above) [download](https://nodejs.org/en/download/)
- Git

## Installation and running application

Clone repository:

```sh
$ git clone <repository> <project-name>
$ cd <project-name>
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

## Project requirements and solutions

The project will be a simple HTTP server which contains:

- `POST /articles` save given article
- `GET /articles/{id}` get article by given id
- `GET /tagName/date` get articles summary report by given tagName and date

For building the project, I

- mainly focused on fulfilling requirements.
- created a simple data store provide feature for saving/filtering articles.
- created isolated/divided repository module for future extending persistence layer.

## Assumptions

In data storage, the "id" field value of articles:

- is unique.
- is a string type value which only contains digits.

In data storage, searching articles:

- by date is more performant than by tag name.
- only provide filtering articles by date and tag name.

## Project Timetable

| Task                                                                       | Duration (hours) |
| -------------------------------------------------------------------------- | ---------------- |
| Setting up project (Git, NodeJS, IDE, linter, code-formatter, test-runner) | 2                |
| Setting up Babel, test-coverage                                            | 2                |
| Data access layer implementation (including mock data generation)          | 4                |
| Service logic implementation                                               | 1                |
| Setting up HTTP server packages and REST API endpoint implementation       | 4                |
| HTTP client test                                                           | 1                |
| Submission                                                                 |                  |

## Other items

A list that I would have added to the project if I had more time:

- ~~Babel~~
- Typescript
- ~~Schema validation of input articles~~
- Data access object with 3'rd party database systems
- API authentication
- Logging production
- ~~HTTP client request collection~~
- API documentation
- Environment profiling
- Containerizing production build
- Deployment
