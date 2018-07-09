[![Build Status](https://travis-ci.org/Iyke09/Events.svg?branch=develop)](https://travis-ci.org/Iyke09/Events)
[![Coverage Status](https://coveralls.io/repos/github/Iyke09/Events/badge.svg?branch=develop)](https://coveralls.io/github/Iyke09/Events?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/671fedc63e899c47bd52/maintainability)](https://codeclimate.com/github/Iyke09/Events/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/671fedc63e899c47bd52/test_coverage)](https://codeclimate.com/github/Iyke09/Events/test_coverage)

## Events Manager
The events manager is simply an awesome app where users can book events for particular centers and also be able to manage it and also where users with admin privileges can create centers and also manage it also.

### API Documentation
You can find the API documentation [here](https://eventsz.herokuapp.com/api-docs)

### Prerequisites
Before you can run this project locally on your machine here are the applications you need to install on your machine:

1. [ Nodejs 6](https://nodejs.org/en/)
1. [Postgres DB](https://www.postgresql.org/download/)
1. [git](https://git-scm.com/downloads)

### How to install
* **Open a terminal/command prompt** on your computer and cd into your preferred path/location.
* **Clone repo:** to do this, run the following command on your **terminal/command prompt.**
```
git clone https://github.com/Iyke09/Events.git
```
* **Navigate to the cloned directory**
* **Install dependencies:** To do this, run the following command:
 ```
npm install
```

* **Initialize database:** Run the following commands:
```
npm run migrate
```

* **Start Server:** Run the following commands:
```
npm run start:dev
```
and on your browser navigate to
```
http://localhost:3000/
```


  ## Testing
 This app uses the following for testing: 
  1. `Mocha/Chai` and `supertest` for backend testing.
  1. `Enzyme` and `Jest` for frontend testing
  1. `NightWatch` for End-2-End testing
    
- npm install - run this to download all the project dependencies.    That is if you have not do this before.
- npm test - to run test for frontend
- npm run test:db - to run test for backend
- npm run test-e2e - to run end to end test


## Technologies

This project was built using the following technology:

1. [ Nodejs 6](https://nodejs.org/en/) A JavaScript runtime built on Chrome's V8 JavaScript engine.
1. [Postgres DB](https://www.postgresql.org/download/) An open source object-relational database system.
 1. [Express 4](https://expressjs.com/) Fast, un-opinionated, minimalist web framework for Node.js
 1. [Sequelize](http://docs.sequelizejs.com/) A promise-based ORM for Node.js.
 1. [React](https://reactjs.org/) A declarative, efficient, and flexible JavaScript library for building user interfaces.
 1. [materialize-css](https://materializecss.com) An open source toolkit for developing with HTML, CSS, and JS

## Contributing
Contributions are welcome and appreciated. To contribute

-  Fork this repository
- Clone your copy of the repository.
- Create your feature branch on your local machine with `git checkout -b your-feature-branch`
- Push your changes to your remote branch with `git push origin your-feature-branch`
-  If you feel you've made a contribution that will improve the project, raise a pull Request against the development branch.
- Be descriptive enough about your contributions so other contributors will understand what you've done
- Refer to this wiki for proper [GIT CONVENTION](https://github.com/codrex/More-recipes/wiki)
- Ensure your codes follow [AirBnB Javascript Style Guide](https://github.com/airbnb/javascript)
-  I am looking forward to your pull request!



### License

This project is authored by Ikenna Nwankwo and it is licensed for your use, modification and distribution under the [MIT license](https://opensource.org/licenses/MIT).