let data = {};
let userToken1 = '';
let userToken2 = '';
const centerTest = (expect, request, adminUrl, usersUrl) => {
describe("CENTERS TEST",  () => {
    before((done) => {
        request.post(`${usersUrl}/signup`)
        .send({
            username: 'jay-jay1',
            password: '123456',
            email: 'enaho331@gmail.com',
        })
        .end((err, res) => {
          userToken1 = res.body.token;
        });
        request.post(`${usersUrl}/signup`)
        .send({
            username: 'jay-jay',
            password: '123456',
            email: 'enaho330@gmail.com',
        })
        .end((err, res) => {
            userToken2 = res.body.token;
            done();
        });
    });
    describe('Add Center', () => {
        beforeEach((done) => {
            data = {
                name: 'emporium',
                description: 'Nigerian Fried Rice puts a spicy, flavorful spin on the traditional',
                capacity: 4500,
                location: '14 airport road, california',
                instructions: 'stir for 5minutes'
            };
            done();
        });
    
        // check if token is passed
        it('should return 401 if token is not present', (done) => {
          request.post(adminUrl)
            .send({data})
            .end((err, res) => {
              expect(res.status).to.equal(401);
              expect(res.body.error.message).to.equal('jwt must be provided');
              done();
            });
        });
    
        it('should return 401 if token is not for an admin user', (done) => {
          request.post(`${adminUrl}?token=${userToken2}`)
            .send(data)
            .end((err, res) => {
              expect(res.status).to.equal(401);
              done();
            });
        });
    
        // test if name is passed when creating a recipe
        it('should return 400 if center name is less than 3', (done) => {
          const noName = Object.assign({}, data);
          noName.name = 'er';
          request.post(`${adminUrl}?token=${userToken1}`)
            .send(noName)
            .end((err, res) => {
              // expect(res.status).to.equal(500);
              expect(res.body.message).to.equal('name must be atleast 4 characters long');
              done();
            });
        });
    
        it('should return 400 if center name does not contain only letters', (done) => {
          const noName = Object.assign({}, data);
          noName.name = 'errr$%';
          request.post(`${adminUrl}?token=${userToken1}`)
            .send(noName)
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body.message).to.equal('name must be alphanumeric');
              done();
            }); 
        });
    
        it('should return 400 if center description is less than 10 char', (done) => {
          const noName = Object.assign({}, data);
          noName.description = 'ab';
          request.post(`${adminUrl}?token=${userToken1}`)
            .send(noName)
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body.message).to.equal('description must be atleast 10 characters');
              done();
            });
        });
    
        it('should return 500 if capacity contains letters', (done) => {
          const noName = Object.assign({}, data);
          noName.capacity = 'hellloo45';
          request.post(`${adminUrl}?token=${userToken1}`)
            .send(noName)
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body.message).to.equal('only numbers are allowed for the capacity of the center');
              done();
            });
        });
    
        it('return 201 if center is created', (done) => {
          request.post(`${adminUrl}?token=${userToken1}`)
            .send(data)
            .end((err, res) => {
              expect(res.status).to.equal(201);
              expect(res.body.message).to.equal('Center created');
              expect(res.body.message).to.equal('Center created');
              expect(res.body.center.name).to.equal('emporium');
              done();
            });
        });
    });

    describe('Favorite Center', () => {
        beforeEach(() => {
          data = {
            name: 'emporium',
            description: 'Nigerian Fried Rice puts a spicy, flavorful spin on the traditional',
            capacity: 4500,
            location: '14 airport road, california',
            instructions: 'stir for 5minutes'
          };
        });
        //const adminUrl = `${adminUrl}/favorite/11`
    
        // check if token is passed
        it('return 404 if center not found', (done) => {
          request.put(`${adminUrl}/favorite/11?token=${userToken2}`)
            .send()
            .end((err, res) => {
              expect(res.status).to.equal(404);
              expect(res.body.message).to.equal('not Found');
              done();
            });
        });
    
        it('return 201 if succesful', (done) => {
          request.put(`${adminUrl}/favorite/1?token=${userToken2}`)
          .send()
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body.message).to.equal('Center favorited');
            done();
          });
        });
    
        it('return 200 if succesfully deleted favorite', (done) => {
          request.put(`${adminUrl}/favorite/1?token=${userToken2}`)
          .send()
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.message).to.equal('Center unfavorited');
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
              expect(res.body.center.name).to.equal('emporiumII');
              done();
            });
        });
    
        it('return 500 if recipe title contains non-letters', (done) => {
          request.put(`${adminUrl}/1?token=${userToken1}`)
            .send({ name: 'chi*c ken' })
            .end((err, res) => {
              expect(res.status).to.equal(400);
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
              expect(res.status).to.equal(400);
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
              expect(res.body.centers.length).to.equal(1);
              done();
            });
        });
    
        it('return 200 if it gets all centers based on query parameters ', (done) => {
          request.get(`${adminUrl}?name=emporium`)
            .send()
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body.message).to.equal('centers found');
              expect(res.body.centers.length).to.equal(1);
              done();
            });
        });
    
        it('return 404 if it dosnt get all centers', (done) => {
          request.get(`${adminUrl}?name=emporiums&capacity=45000`)
            .send()
            .end((err, res) => {
              expect(res.status).to.equal(404);
              expect(res.body.message).to.equal('Oops!!..sorry no items matched your search');
              done();
            });
        });
    });
});
};

export default centerTest;