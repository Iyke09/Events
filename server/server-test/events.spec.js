let data = {};
let userToken1 = '';
let userToken2 = '';
let checkId = '';
const eventTest = (expect, request, eventUrl, usersUrl) => {
    console.log(eventUrl);
    describe("EVENTS TEST",  () => {
        before((done) => {
            request.post(`${usersUrl}/signin`)
            .send({
              password: '123456',
              email: 'enaho331@gmail.com',
            })
            .end((err, res) => {
              userToken1 = res.body.token;
            });
            request.post(`${usersUrl}/signup`)
            .send({
                username: 'jay-jay4',
                password: '123456',
                email: 'enaho335@gmail.com',
            })
            .end((err, res) => {
                userToken2 = res.body.token;
                done();
            });
        });
        describe('Add Events', () => {
            beforeEach(() => {
              data = {
                name: 'emporiumII',
                title: 'Concert',
                type: 'Musical',
                guests: 4000,
                time: '09:00',
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
        
            it('return 400 if title contains not only letters', (done) => {
              const noName = Object.assign({}, data);
              noName.title = 'ab^ hj';
              request.post(`${eventUrl}?token=${userToken2}`)
                .send(noName)
                .end((err, res) => {
                  expect(res.status).to.equal(400);
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
                  expect(res.body.message).to.equal(`Sorry!!! please select another hall, maximum capacity exceeded`);
                  done();
                });
            });
        
            it('return 400 if guests contains not only letters', (done) => {
              const noName = Object.assign({}, data);
              noName.guests = 'ajsbd';
              request.post(`${eventUrl}?token=${userToken1}`)
                .send(noName)
                .end((err, res) => {
                  expect(res.status).to.equal(400);
                  expect(res.body.message).to.equal('only numbers are allowed for guests field');
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
              noName.time = '08:34';
              request.post(`${eventUrl}?token=${userToken2}`)
                .send(noName)
                .end((err, res) => {
                  checkId = res.body.events.id;
                  expect(res.status).to.equal(201);
                  expect(res.body.status).to.equal('Success');
                  expect(res.body.message).to.equal('Event created');
                  done();
                });
            });
        
        
            it('return 201 if successful--ly created by admin user', (done) => {
              const noName = Object.assign({}, data);
              noName.date = '2016-05-20';
              noName.time = '02:37';
              request.post(`${eventUrl}?token=${userToken1}`)
                .send(noName)
                .end((err, res) => {
                  expect(res.status).to.equal(201);
                  expect(res.body.status).to.equal('Success');
                  expect(res.body.message).to.equal('Event created');
                  done();
                });
            });
        
            it('return 400 if center does not exist', (done) => {
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
        
            it('return 400 if admin user trying to update event----', (done) => {
              request.put(`${eventUrl}/${checkId}?token=${userToken1}`)
                .send({ date: '2017-08-28', time: '08:38' })
                .end((err, res) => {
                  expect(res.status).to.equal(401);
                  expect(res.body.message).to.equal('Not Authorized');
                  done();
                });
            });
        
        
            it('return 201 if event is updated by admin user', (done) => {
              request.put(`${eventUrl}/3?token=${userToken1}`)
                .send({ title: 'Concert', date: '2019-02-09', time: '09:40' })
                .end((err, res) => {
                  expect(res.status).to.equal(201);
                  expect(res.body.message).to.equal('event updated');
                  expect(res.body.success.title).to.equal('Concert');
                  done();
                });
            });
        
            it('return 201 if event is updated', (done) => {
              request.put(`${eventUrl}/1?token=${userToken2}`)
                .send({ title: 'Concert', date: '2019-05-09', time: '09:45' })
                .end((err, res) => {
                  expect(res.status).to.equal(201);
                  expect(res.body.message).to.equal('event updated');
                  expect(res.body.success.title).to.equal('Concert');
                  done();
                });
            });
        
        
            it('return 400 if recipe title contains spacd', (done) => {
              request.put(`${eventUrl}/1?token=${userToken2}`)
                .send({ title: 'chi*c ken' })
                .end((err, res) => {
                  expect(res.status).to.equal(500);
                  expect(res.body.message).to.equal('only alphabets are allowed for the title');
                  done();
                });
            });
        });

        describe('Center Event', () => {
          it('return 404 if no event for that center', (done) => {
            request.get(`${eventUrl}/7/centers`)
              .send()
              .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.body.message).to.equal('No events for this center');
                done();
              });
          });
      
          it('return 200 if events are available for that center', (done) => {
            request.get(`${eventUrl}/1/centers`)
              .send()
              .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.message).to.equal('center events successfully retrieved');
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
    });
};

export default eventTest;