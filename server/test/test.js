import { expect } from 'chai';
import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../app';

const request = supertest(app);
const rootURL = '/api/v1';
const usersUrl = `${rootURL}/users`;
const adminUrl = `${rootURL}/centers`;
const eventUrl = `${rootURL}/events`;

let data = {};
let userToken1 = '';
let userToken2 = '';
let checkId = '';

describe('API Integration Tests', () => {
  describe('User signup', () => {
    const signupURl = `${usersUrl}/signup`;
    beforeEach(() => {
      data = {
        username: 'jane56',
        password: '123456',
        email: 'enaho31@gmail.com'
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
          userToken1 = res.body.token;
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
          userToken2 = res.body.token;
          const decoded = jwt.decode(userToken2);
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
        capacity: 4500,
        location: '14 airport road, california',
        instructions: 'stir for 5minutes'
      };
    });

    // check if token is passed
    it('return 400 if token is not present', (done) => {
      request.post(adminUrl)
        .send(data)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.error.message).to.equal('jwt must be provided');
          done();
        });
    });

    it('return 400 if token is not for an admin user', (done) => {
      request.post(`${adminUrl}?token=${userToken2}`)
        .send(data)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });

    // test if name is passed when creating a recipe
    it('return 500 if center name is less than 3', (done) => {
      const noName = Object.assign({}, data);
      noName.name = 'er';
      request.post(`${adminUrl}?token=${userToken1}`)
        .send(noName)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body.message).to.equal('name must be atleast 4 characters long');
          done();
        });
    });

    it('return 500 if center name does not contain only letters', (done) => {
      const noName = Object.assign({}, data);
      noName.name = 'errr$%';
      request.post(`${adminUrl}?token=${userToken1}`)
        .send(noName)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body.message).to.equal('name must be alphanumeric');
          done();
        });
    });

    it('return 500 if center description is less than 10 char', (done) => {
      const noName = Object.assign({}, data);
      noName.description = 'ab';
      request.post(`${adminUrl}?token=${userToken1}`)
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
      request.post(`${adminUrl}?token=${userToken1}`)
        .send(noName)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body.message).to.equal('only numbers are allowed');
          done();
        });
    });

    it('return 201 if center is created', (done) => {
      request.post(`${adminUrl}?token=${userToken1}`)
        .send(data)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('Center created');
          expect(res.body.status).to.equal('Success');
          done();
        });
    });
  });

  describe('Add Events', () => {
    beforeEach(() => {
      data = {
        name: 'emporium',
        title: 'Concert',
        type: 'Musical',
        guests: 4000,
        time: '09:00pm',
        date: '2017-08-24'
      };
    });

    // check if token is passed
    it('return 400 if token is not present', (done) => {
      request.post(eventUrl)
        .send(data)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.error.message).to.equal('jwt must be provided');
          done();
        });
    });

    it('return 500 if title contains not only letters', (done) => {
      const noName = Object.assign({}, data);
      noName.title = 'ab^ hj';
      request.post(`${eventUrl}?token=${userToken2}`)
        .send(noName)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body.message).to.equal('only alphabets are allowed for the title');
          done();
        });
    });

    it('return 400 if guests exceeds capacity', (done) => {
      const noName = Object.assign({}, data);
      noName.guests = 6000;
      request.post(`${eventUrl}?token=${userToken2}`)
        .send(noName)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Sorry!!! please select another hall, maximum capacity exceeded');
          done();
        });
    });

    it('return 500 if guests contains not only letters', (done) => {
      const noName = Object.assign({}, data);
      noName.guests = 'ajsbd';
      request.post(`${eventUrl}?token=${userToken1}`)
        .send(noName)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body.message).to.equal('only numbers are allowed');
          done();
        });
    });

    it('return 201 if successful', (done) => {
      request.post(`${eventUrl}?token=${userToken2}`)
        .send(data)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('Event created');
          done();
        });
    });


    it('return 201 if successful--ly', (done) => {
      const noName = Object.assign({}, data);
      noName.date = '28';
      noName.time = '08:34am';
      request.post(`${eventUrl}?token=${userToken2}`)
        .send(noName)
        .end((err, res) => {
          checkId = res.body.cente.id;
          expect(res.status).to.equal(201);
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('Event created');
          done();
        });
    });

    it('return 201 if successful--ly created by admin user', (done) => {
      const noName = Object.assign({}, data);
      noName.date = '2016-05-20';
      noName.time = '02:37am';
      request.post(`${eventUrl}?token=${userToken1}`)
        .send(noName)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('Event created');
          done();
        });
    });

    it('return 500 if center does not exist', (done) => {
      const noName = Object.assign({}, data);
      noName.name = 'emporium3';
      request.post(`${eventUrl}?token=${userToken1}`)
        .send(noName)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('center not found or is currently not available');
          done();
        });
    });

    it('return 400 if unsuccessful', (done) => {
      request.post(`${eventUrl}?token=${userToken1}`)
        .send(data)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('Unsuccessful');
          expect(res.body.message).to.equal('Already booked, please select another day');
          done();
        });
    });
  });

  describe('Update Event', () => {
    it('return 401 if user not authorized', (done) => {
      request.put(`${eventUrl}/3?token=${userToken2}`)
        .send()
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('Not Authorized');
          done();
        });
    });

    it('return 401 if token is scrambled', (done) => {
      const token = `${userToken1}jdsk`;
      request.put(`${eventUrl}/1?token=${token}`)
        .send()
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.error.message).to.equal('invalid signature');
          done();
        });
    });

    it('return 404 if center is not found', (done) => {
      request.put(`${eventUrl}/15?token=${userToken2}`)
        .send()
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('event Not Found');
          done();
        });
    });

    it('return 400 if center is not updated**', (done) => {
      request.put(`${eventUrl}/${checkId}?token=${userToken2}`)
        .send({ date: '2017-11-28', time: '08:34am' })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('Unsuccessful');
          expect(res.body.message).to.equal('Already booked, please select another day');
          done();
        });
    });

    it('return 400 if admin user trying to update event----', (done) => {
      request.put(`${eventUrl}/${checkId}?token=${userToken1}`)
        .send({ date: '2017-08-28', time: '08:34am' })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('Not Authorized');
          done();
        });
    });

    it('return 400 if event is not updated**', (done) => {
      request.put(`${eventUrl}/3?token=${userToken1}`)
        .send({ date: '2017-11-28', time: '08:34am' })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('Unsuccessful');
          expect(res.body.message).to.equal('Already booked, please select another day');
          done();
        });
    });

    it('return 201 if event is updated by admin user', (done) => {
      request.put(`${eventUrl}/3?token=${userToken1}`)
        .send({ title: 'Concert', date: '2019-02-09', time: '09:40pm' })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('event updated');
          expect(res.body.success.title).to.equal('Concert');
          done();
        });
    });

    it('return 201 if event is updated', (done) => {
      request.put(`${eventUrl}/1?token=${userToken2}`)
        .send({ title: 'Concert', date: '2019-05-09', time: '09:45pm' })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('event updated');
          expect(res.body.success.title).to.equal('Concert');
          done();
        });
    });


    it('return 500 if recipe title contains spacd', (done) => {
      request.put(`${eventUrl}/1?token=${userToken2}`)
        .send({ title: 'chi*c ken' })
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body.message).to.equal('only alphabets are allowed for the title');
          done();
        });
    });
  });


  describe('Delete Events', () => {
    beforeEach(() => {
      data = {
        name: 'emporium',
      };
    });

    // check if token is passed
    it('return 400 if token is not present', (done) => {
      request.post(eventUrl)
        .send(data)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.error.message).to.equal('jwt must be provided');
          done();
        });
    });


    it('return 404 if event does not exist', (done) => {
      request.delete(`${eventUrl}/6?token=${userToken1}`)
        .send()
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Event Not Found');
          done();
        });
    });

    it('return 200 if is successfully deleted', (done) => {
      request.delete(`${eventUrl}/1?token=${userToken1}`)
        .send()
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Event deleted by admin');
          done();
        });
    });

    it('return 200 if is successfully deleted--', (done) => {
      request.delete(`${eventUrl}/2?token=${userToken2}`)
        .send()
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('event deleted');
          done();
        });
    });

    it('return 401 if not same user id', (done) => {
      request.delete(`${eventUrl}/3?token=${userToken2}`)
        .send()
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('Not Authorized');
          done();
        });
    });
  });

  describe('Update Center', () => {
    it('return 401 if user not authorized', (done) => {
      request.put(`${adminUrl}/1?token=${userToken2}`)
        .send()
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.title).to.equal('Not Authenticated!!!');
          done();
        });
    });

    it('return 401 if token is scrambled', (done) => {
      const token = `${userToken1}jdsk`;
      request.put(`${adminUrl}/1?token=${token}`)
        .send()
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.error.message).to.equal('invalid signature');
          done();
        });
    });

    it('return 404 if center is not found', (done) => {
      request.put(`${adminUrl}/15?token=${userToken1}`)
        .send()
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('center Not Found');
          done();
        });
    });

    it('return 400 if params id is string', (done) => {
      request.put(`${adminUrl}/hk?token=${userToken1}`)
        .send()
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('return 201 if center is updated', (done) => {
      request.put(`${adminUrl}/1?token=${userToken1}`)
        .send({ name: 'emporiumII' })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('center updated');
          expect(res.body.success.name).to.equal('emporiumII');
          done();
        });
    });

    it('return 500 if recipe title contains non-letters', (done) => {
      request.put(`${adminUrl}/1?token=${userToken1}`)
        .send({ name: 'chi*c ken' })
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body.message).to.equal('name must be alphanumeric');
          done();
        });
    });
  });

  describe('Details Center', () => {
    it('return 404 if center is not found', (done) => {
      request.get(`${adminUrl}/14`)
        .send()
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('center Not Found');
          done();
        });
    });

    it('return 201 if center is found', (done) => {
      request.get(`${adminUrl}/1`)
        .send()
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('center found');
          done();
        });
    });

    it('return 500 if id is an alphabet', (done) => {
      request.get(`${adminUrl}/err`)
        .send()
        .end((err, res) => {
          expect(res.status).to.equal(500);
          done();
        });
    });
  });

  describe('All Centers', () => {
    it('return 200 if it gets all centers', (done) => {
      request.get(adminUrl)
        .send()
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('centers found');
          expect(res.body.center.length).to.equal(1);
          done();
        });
    });
  });
});

