/* eslint-disable no-undef */
const expect = require('expect');
const request = require('supertest');
const { app } = require('../../../index');
const User = require('../../users/user-model');
const { testUser } = require('../seed/seed');

const ENDPOINT = '/register';

describe(`POST ${ENDPOINT}`, () => {
	it('should create a new user', (done) => {
		const email = 'example@gmail.com';
		const password = '123456';
		request(app)
			.post(ENDPOINT)
			.send({
				email,
				password,
			})
			.expect(200)
			.expect((res) => {
				expect(res.body.email).toBe(email);
			})
			.end(async (err, res) => {
				if (err) {
					return done(err);
				}
				const users = await User.find({ email });
				expect(users.length).toBe(1);
				expect(users[0].email).toBe(email);
				return done();
			});
	});
	it('should not register if email in use', (done) => {
		request(app)
			.post(ENDPOINT)
			.send({
				email: testUser.email,
				password: '123456',
			})
			.expect(400)
			.end(async (err, res) => {
				if (err) {
					return done(err);
				}
				expect(res.error).toExist();
				return done();
			});
	});
	it('should return 400 if email is not a valid email', (done) => {
		request(app)
			.post(ENDPOINT)
			.send({
				email: 'user@gmail',
				password: '123456',
			})
			.expect(400)
			.end(done);
	});
});
