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

### Services

Bring up the service (sorry, no microservices yet) by doing:

```
npm run start
```

## Usage

Only these two requests have been implemented:

### Login

```
curl -X POST http://localhost:3000/auth/login -d '{"username": "john", "password": "password123"}' -H "Content-Type: application/json"
```

### Create job vacancy

```
curl -X POST http://localhost:3000/jobs/create -d '{"title": "test title", "description": "test description", "expiredAt": "2030-01-01 13:14:15"}' -H "Content-Type: application/json" -H "Authorization: Bearer <JWT>"
```


## Testing

Execute this command to run all tests:

```
npm run test
```

## License

Jobs Portal is [MIT licensed](LICENSE).
