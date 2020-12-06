## Description

[Jobs Portal](https://github.com/jm-armijo/jobs-portal) is a lightweight jobs portal.

The main features supported are:
- A user with an admin role can view, create, edit, and delete vacancies
- A user without an admin role can view job vacancies only

This projects has been implemented in [Node.js](https://nodejs.org/), [Typescript](https://www.typescriptlang.org/) and [MongoDB](https://www.mongodb.com/); using [Nest.js](https://nestjs.com/).

## Setup

### Database

Create the image and run the db container:
```
docker build . -t mongodb
docker run --name portal-db -p 27017:27017 -d mongodb
```

TBD

## License

Jobs Portal is [MIT licensed](LICENSE).
