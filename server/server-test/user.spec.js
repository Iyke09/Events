let data = {};
const userTest = (expect, request, usersUrl, userToken1, userToken2, jwt) => {
    describe('User signup', () => {
        const signupURl = `${usersUrl}/signup`;
        beforeEach(() => {
          data = {
            username: 'janeet',
            password: '123456',
            email: 'enaho332@gmail.com'
          };
        });
    
        it('return 200 for a successful account creation', (done) => {
          request.post(signupURl)
            .send(data)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.status).to.equal('Success');
              expect(res.body.message).to.equal('Successfully logged in');
              done();
            });
        });
    
        it('return 200 for a second successful account creation', (done) => {
          request.post(signupURl)
            .send({
              username: 'janedoe',
              password: '123456',
              email: 'enaho333@gmail.com',
            })
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.status).to.equal('Success');
              expect(res.body.message).to.equal('Successfully logged in');
              done();
            });
        });
    
        it('return 400 for an already existing username ', (done) => {
          const invalidData = Object.assign({}, data);
          invalidData.username = 'janedoe';
          invalidData.email = 'enahooo@gmail.com';
          request.post(signupURl)
            .send(invalidData)
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body.message).to.equal('Oops. An account already exist with this username');
              done();
            });
        });
    
        it('return 400 for an already existing email', (done) => {
          const invalidData = Object.assign({}, data);
          invalidData.email = 'enaho331@gmail.com';
          invalidData.username = 'enaho540';
          request.post(signupURl)
            .send(invalidData)
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body.message).to.equal('Oops.The email you entered already exists');
              done();
            });
        });
    
        it('return 400 for a username of length 3 ', (done) => {
          const invalidData = Object.assign({}, data);
          invalidData.username = 'jan';
          request.post(signupURl)
            .send(invalidData)
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body.message).to.equal('Username must be btw 5 - 10 characters');
              done();
            });
        });
    
        it('return 400 for a username which is not alphanumeric ', (done) => {
          const invalidData = Object.assign({}, data);
          invalidData.username = 'ja $$%n';
          request.post(signupURl)
            .send(invalidData)
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body.message).to.equal('Username must start with a letter, have no spaces');
              done();
            });
        });
    
        it('return 400 for an invalid email', (done) => {
          const invalidData = Object.assign({}, data);
          invalidData.username = 'iyke09';
          invalidData.email = 'iykay';
          request.post(signupURl)
            .send(invalidData)
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body.message).to.equal('The email you entered is not valid');
              done();
            });
        });
    
        it('return 400 for if no email is passed ', (done) => {
          const invalidData = Object.assign({}, data);
          delete invalidData.email;
    
          request.post(signupURl)
            .send(invalidData)
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body.message).to.equal('User.email cannot be null');
              done();
            });
        });
    
        it('return 400 for if no username is not passed ', (done) => {
          const invalidData = Object.assign({}, data);
          delete invalidData.username;
    
          request.post(signupURl)
            .send(invalidData)
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body.message).to.equal('User.username cannot be null');
              done();
            });
        });
    
        it('return 400 for if no password is passed ', (done) => {
          const invalidData = Object.assign({}, data);
          delete invalidData.password;
    
          request.post(signupURl)
            .send(invalidData)
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body.message).to.equal('password field is required');
              done();
            });
        });
    
        it('return 400 for if password less than 6 character ', (done) => {
          const invalidData = Object.assign({}, data);
          invalidData.password = 'jant';
    
          request.post(signupURl)
            .send(invalidData)
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body.message).to.equal('password must be greater than 6 characters');
              done();
            });
        });
    });

    describe('User login', () => {
        const loginURl = `${usersUrl}/signin`;
    
        // main user login
        it('return 200 for a successful login and is Admin', (done) => {
          request.post(loginURl)
            .send({
                password: '123456',
                email: 'enaho331@gmail.com',
            })
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
        it('return 200 for a successful login ', (done) => {
          request.post(loginURl)
            .send({
              password: '123456',
              email: 'enaho332@gmail.com',
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
    
        it('return 400 for wrong email and password', (done) => {
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
              expect(res.body.message).to.equal('invalid login details');
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
              expect(res.body.message).to.equal('password field cannot be empty');
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
              expect(res.body.message).to.equal('email field cannot be empty');
              done();
            });
        });
    });

    describe('Password change', () => {
        // check if token is passed
        it('return 400 if token is not present', (done) => {
          request.post(`${usersUrl}/change`)
            .send()
            .end((err, res) => {
              expect(res.status).to.equal(401);
              expect(res.body.error.message).to.equal('jwt must be provided');
              done();
            });
        });
    
        it('return 403 if admin user trying to access route', (done) => {
          request.post(`${usersUrl}/change?token=${userToken1}`)
          .send()
          .end((err, res) => {
            expect(res.status).to.equal(403);
            expect(res.body.message).to.equal('admin user not authorized!');
            done();
          });
        });
    
        // test if name is passed when creating a recipe
        it('return 400 if old pass !== new pass entered', (done) => {
          request.post(`${usersUrl}/change?token=${userToken2}`)
            .send({ old: 'elobae', newp: 'hola', newc: 'hola' })
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body.message).to.equal('invalid password');
              done();
            });
        });
    
        it('return 400 if passwords do not match', (done) => {
          request.post(`${usersUrl}/change?token=${userToken2}`)
          .send({ old: '123456', newp: 'hola', newc: 'holabalu' })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal('passwords do not match');
            done();
          });
        });
    
        it('return 201 if passwords match and is successful', (done) => {
          request.post(`${usersUrl}/change?token=${userToken2}`)
          .send({ old: '123456', newp: 'hola', newc: 'hola' })
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body.message).to.equal('password successfully changed');
            done();
          });
        });
      });
    
    describe('Password Retrieval', () => {
        it('return 400 if email does not exist', (done) => {
          request.post(`${usersUrl}/reset`)
          .send({ email: 'foo@foo.com' })
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body.message).to.equal('email does not exist');
            done();
          });
        });
    
        it('return 200 if email does exist', (done) => {
          request.post(`${usersUrl}/reset`)
          .send({ email: 'enaho330@gmail.com' })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.message).to.equal('password sent to your email address');
            done();
          });
        });
    });

    describe('Add Review', () => {
      beforeEach(() => {
        data = {
          id: 1,
          username: 'Nigerian',
          comment: 'Nigerian Fried Rice puts a spicy, flavorful spin on the traditional',
        };
      });
      it('should return 404 if center not found', (done) => {
        request.post(`${usersUrl}/reviews/8?token=${userToken2}`)
          .send(data)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body.message).to.equal('center does not exist');
            done();
          });
      });
  
      it('should return 201 if review is successfully created', (done) => {
        request.post(`${usersUrl}/reviews/1?token=${userToken2}`)
          .send(data)
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body.message).to.equal('review created');
            done();
          });
      });
    });
  
    describe('All Reviews', () => {
      it('return 404 no review is not available', (done) => {
        request.get(`${usersUrl}/reviews/5?token=${userToken2}`)
          .send()
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body.message).to.equal('No reviews available');
            done();
          });
      });
      it('return 200 if it gets all reviews', (done) => {
        request.get(`${usersUrl}/reviews/1?token=${userToken2}`)
          .send()
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.status).to.equal('Success');
            expect(res.body.message).to.equal('reviews found');
            expect(res.body.review.length).to.equal(1);
            done();
          });
      });
    });
    
};

export default userTest;

