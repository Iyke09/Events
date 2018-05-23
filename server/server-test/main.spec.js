import userTest from './user.spec';
import centerTest from './centers.spec';
import eventTest from './events.spec';
import { expect } from 'chai';
import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../app';

const request = supertest(app);
const rootURL = '/api/v1';
const usersUrl = `${rootURL}/users`;
const adminUrl = `${rootURL}/centers`;
const eventUrl = `${rootURL}/events`;

let userToken1 = '';
let userToken2 = '';
let checkId = '';

describe("Event Manager Test(EMT)", function () {
    centerTest(expect, request, adminUrl, usersUrl);
    userTest(expect, request, usersUrl, userToken1, userToken2, jwt);
    eventTest(expect, request, eventUrl, usersUrl);
});


