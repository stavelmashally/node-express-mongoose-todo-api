/* eslint-disable no-undef */
const expect = require('expect');
const request = require('supertest');
const { app } = require('../../../index');
const { testUser, populateUser } = require('../seed/seed');

const ENDPOINT = '/login';

describe(`POST ${ENDPOINT}`, () => {
	before(populateUser);
	it('should return a token if login success', (done) => {
		request(app)
			.post(ENDPOINT)
			.send({
				username: testUser.email,
				password: testUser.password,
			})
			.expect(200)
			.expect((res) => {
				expect(res.body.token).toExist();
			})
			.end(done);
	});
	it('should not allowed to login with wrong password', (done) => {
		request(app)
			.post(ENDPOINT)
			.send({
				username: testUser.email,
				password: 'password',
			})
			.expect(401)
			.end(done);
	});
	it('should return 404 if email does not exist', (done) => {
		request(app)
			.post(ENDPOINT)
			.send({
				email: 'email',
				password: testUser.password,
			})
			.expect(404)
			.end(done);
	});
});
