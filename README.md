[![Build Status](https://travis-ci.org/Iyke09/Events.svg?branch=develop)](https://travis-ci.org/Iyke09/Events)
[![Coverage Status](https://coveralls.io/repos/github/Iyke09/Events/badge.svg?branch=develop)](https://coveralls.io/github/Iyke09/Events?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/671fedc63e899c47bd52/maintainability)](https://codeclimate.com/github/Iyke09/Events/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/671fedc63e899c47bd52/test_coverage)](https://codeclimate.com/github/Iyke09/Events/test_coverage)

## Events Manager
The events manager is simply an awesome app where users can book events for particular centers and also be able to manage it and also where users with admin privileges can create centers and also manage it also.

### To Run:

- In your terminal, clone this repo by typing
```
 git clone https://github.com/Iyke09/Events.git
```
- then cd into events

```
 run npm install && npm run start:dev
```
- then check it out in browser at localhost:8000

### Available routes

- **GET** http://localhost:8000/api/v1/centers - to get all available centers

- **PUT** http://localhost:8000/api/v1/centers/1 - to update a center with ID of 1

- **DELETE** http://localhost:8000/api/v1/events/1 - to delete an event with ID of 1

- **POST** http://localhost:8000/api/v1/events - to add an event

- **PUT** http://localhost:8000/api/v1/events/1 - to update an event with ID of 1

- **POST** http://localhost:8000/api/v1/users/signup - to add a new user 

- **POST** http://localhost:8000/api/v1/users/signin - to login a user 

- **POST** http://localhost:8000/api/v1/users/change - to change password

- **POST** http://localhost:8000/api/v1/users/retrieve - to retrieve forgotten password 


##### To view templates cd into events/client/templates

```
 open index.html in your favorite browser
```
- or simply visit https://iyke09.github.io/Events/templates/index.html
