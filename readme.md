# Technical Test (Nine)

## Technical test details and submissions

The technical test details is provided from: ~~the-given-url-page~~.

The project including this document will be submitted to: ~~the-given-email-address~~.

## Repository

Public repository favoured

## Setup and installation

System requirements:

- Node,js (v16.15.1 or above) [download](https://nodejs.org/en/download/)
- Git

Clone repository:

```
$ git clone <repository> <project-name>
$ cd <project-name>
```

Package installation:

```
$ npm install
```

Run test:

```
$ npm test
```

Run application:

```
$ npm start
```

## Requirements and solutions

Simple data store provide a feature that is filtering articles by the given tag name and date

## Assumptions

In data storage, the "id" field value of articles:

- is unique
- is a string type value which only contains digits

In data storage, searching articles

- by date is more performant than by tag name
- only provide filtering articles by date and tag name

## Project Timetable

| Task                                                                       | Duration (hours) |
| -------------------------------------------------------------------------- | ---------------- |
| Setting up project (Git, NodeJS, IDE, linter, code-formatter, test-runner) | 2                |
| Setting up Babel, test-coverage                                            | 2                |
| Data access layer implementation (including mock data generation)          | 4                |
| Service logic implementation                                               |                  |
| HTTP ser setting and REST API endpoint implementation                      |                  |
| Submission                                                                 |                  |

## Other items

A list that I would have added to the project if I had more time:

- ~~Babel~~
- Typescript
- Schema validation of input articles
- Data access object with 3'rd party database systems
- API authentication
- Logging
- HTTP client test
- API documentation
- Environment profiling
- Containerizing
- Deployment
