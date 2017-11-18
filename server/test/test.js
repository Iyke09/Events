import { expect } from 'chai';
import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../app';

const request = supertest(app);
const rootURL = '/api';
const usersUrl = `${rootURL}/users`;
const adminUrl = `${rootURL}/centers`;

let data = {};


describe('API Integration Tests', () => {
  describe('User signup', () => {
    const signupURl = `${usersUrl}/signup`;
    beforeEach(() => {
      data = {
        username: 'jane56',
        password: '123456',
        email: 'enaho31@gmail.com',
      };
    });

    it('return 201 for a successful account creation', (done) => {
      request.post(signupURl)
        .send(data)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.status).to.equal('success');
          expect(res.body.message).to.equal('account created');
          done();
        });
    });

    it('return 201 for a second successful account creation', (done) => {
      request.post(signupURl)
        .send({
          username: 'jane562',
          password: '123456',
          email: 'enaho33@gmail.com',
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.status).to.equal('success');
          expect(res.body.message).to.equal('account created');
          done();
        });
    });

    it('return 500 for an already existing username ', (done) => {
      const invalidData = Object.assign({}, data);
      invalidData.username = 'jane56';
      invalidData.email = 'enaho3611@gmail.com';
      request.post(signupURl)
        .send(invalidData)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body.message).to.equal('Oops. An account already exist with this username');
          done();
        });
    });

    it('return 500 for an already existing email', (done) => {
      const invalidData = Object.assign({}, data);
      invalidData.email = 'enaho31@gmail.com';
      invalidData.username = 'enaho54';
      request.post(signupURl)
        .send(invalidData)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body.message).to.equal('Oops.The email you entered already exists');
          done();
        });
    });

    it('return 500 for a username of length 3 ', (done) => {
      const invalidData = Object.assign({}, data);
      invalidData.username = 'jan';
      request.post(signupURl)
        .send(invalidData)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body.message).to.equal('Username must be btw 5 - 10 characters');
          done();
        });
    });

    it('return 500 for a username which is not alphanumeric ', (done) => {
      const invalidData = Object.assign({}, data);
      invalidData.username = 'ja $$%n';
      request.post(signupURl)
        .send(invalidData)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body.message).to.equal('Username must start with a letter, have no spaces');
          done();
        });
    });

    it('return 500 for an invalid email', (done) => {
      const invalidData = Object.assign({}, data);
      invalidData.username = 'iyke09';
      invalidData.email = 'iykay';
      request.post(signupURl)
        .send(invalidData)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body.message).to.equal('The email you entered is not valid');
          done();
        });
    });

    it('return 500 for if no email is passed ', (done) => {
      const invalidData = Object.assign({}, data);
      delete invalidData.email;

      request.post(signupURl)
        .send(invalidData)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body.message).to.equal('User.email cannot be null');
          done();
        });
    });

    it('return 500 for if no username is not passed ', (done) => {
      const invalidData = Object.assign({}, data);
      delete invalidData.username;

      request.post(signupURl)
        .send(invalidData)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body.message).to.equal('User.username cannot be null');
          done();
        });
    });

    it('return 500 for if no password is passed ', (done) => {
      const invalidData = Object.assign({}, data);
      delete invalidData.password;

      request.post(signupURl)
        .send(invalidData)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body.message).to.equal('password is required');
          done();
        });
    });

    it('return 500 for if password less than 6 character ', (done) => {
      const invalidData = Object.assign({}, data);
      invalidData.password = 'jant';

      request.post(signupURl)
        .send(invalidData)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body.message).to.equal('password must be greater than 6 characters');
          done();
        });
    });
  });

  describe('User login', () => {
    const loginURl = `${rootURL}/users/signin`;

    beforeEach(() => {
      data = {
        password: '123456',
        email: 'enaho31@gmail.com',
      };
    });
    // main user login
    it('return 200 for a successful login and is Admin', (done) => {
      request.post(loginURl)
        .send(data)
        .end((err, res) => {
          const userToken1 = res.body.token;
          const decoded = jwt.decode(userToken1);
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Successfully logged in as Admin');
          expect(res.body.status).to.equal('Success');
          expect(decoded.adminUser.isAdmin).to.equal(true);
          expect(userToken1).to.be.a('string');
          done();
        });
    });
    it('return 200 for a successful login and is Admin', (done) => {
      request.post(loginURl)
        .send({
          password: '123456',
          email: 'enaho33@gmail.com',
        })
        .end((err, res) => {
          const userToken1 = res.body.token;
          const decoded = jwt.decode(userToken1);
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Successfully logged in');
          expect(res.body.status).to.equal('Success');
          expect(decoded.user.isAdmin).to.equal(false);
          expect(userToken1).to.be.a('string');
          done();
        });
    });

    it('return 500 for wrong email and password', (done) => {
      const wrongPassword = Object.assign({}, data);
      wrongPassword.password = 'wrongpassword';
      wrongPassword.email = 'wrongpard';
      request.post(loginURl)
        .send(wrongPassword)
        .end((err, res) => {
          const wrongPasswordToken = res.body.token;
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('invalid login details');
          expect(wrongPasswordToken).to.be.a('undefined');
          done();
        });
    });

    it('return 400 for wrong email and password', (done) => {
      const wrongPassword = Object.assign({}, data);
      wrongPassword.password = 'wrongpassword';
      request.post(loginURl)
        .send(wrongPassword)
        .end((err, res) => {
          const wrongPasswordToken = res.body.token;
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Incorrect password');
          expect(wrongPasswordToken).to.be.a('undefined');
          done();
        });
    });

    it('return 400 for if password not entered', (done) => {
      const invalidData = Object.assign({}, data);
      delete invalidData.password;
      request.post(loginURl)
        .send(invalidData)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('please fill in the required fields');
          done();
        });
    });

    it('return 400 for if no email is passed ', (done) => {
      const data1 = Object.assign({}, data);
      delete data1.email;
      request.post(loginURl)
        .send(data1)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('please fill in the required fields');
          done();
        });
    });
  });

  describe('Add Center', () => {
    beforeEach(() => {
      data = {
        name: 'emporium',
        description: 'Nigerian Fried Rice puts a spicy, flavorful spin on the traditional',
        capacity: 4000,
        location: '14 airport road, california',
        instructions: 'stir for 5minutes'
      };
    });

    // // check if token is passed
    // it('return 400 if token is not present', (done) => {
    //   request.post(adminUrl)
    //     .send(data)
    //     .end((err, res) => {
    //       expect(res.status).to.equal(401);
    //       expect(res.body.message).to.equal('you have to be logged in to create recipe');
    //       done();
    //     });
    // });

    // test if name is passed when creating a recipe
    it('return 500 if center name is less than 3', (done) => {
      const noName = Object.assign({}, data);
      noName.name = 'er';
      request.post(adminUrl)
        .send(noName)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body.message).to.equal('name must start with a letter and be at least 3 characters.');
          done();
        });
    });

    it('return 500 if center name does not contain only letters', (done) => {
      const noName = Object.assign({}, data);
      noName.name = 'errr$%';
      request.post(adminUrl)
        .send(noName)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body.message).to.equal('only alphabets are allowed for the name');
          done();
        });
    });

    it('return 500 if center description is less than 10 char', (done) => {
      const noName = Object.assign({}, data);
      noName.description = 'ab';
      request.post(adminUrl)
        .send(noName)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body.message).to.equal('description must be atleast 10 characters');
          done();
        });
    });

    it('return 500 if capacity contains letters', (done) => {
      const noName = Object.assign({}, data);
      noName.capacity = 'hellloo45';
      request.post(adminUrl)
        .send(noName)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body.message).to.equal('only numbers are allowed');
          done();
        });
    });

    it('return 201 if center is created', (done) => {
      request.post(adminUrl)
        .send(data)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('Center created');
          expect(res.body.status).to.equal('Success');
          done();
        });
    });
  });
});

