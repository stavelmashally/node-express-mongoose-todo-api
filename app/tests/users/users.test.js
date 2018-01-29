/* eslint-disable no-undef */
const expect = require('expect');
const request = require('supertest');
const { app } = require('../../../index');
// const User = require('../../users/user-model');
const { testUser, token } = require('../seed/seed');

const ENDPOINT = '/users';

describe(`GET ${ENDPOINT}`, () => {
	it('should get all users', (done) => {
		request(app)
			.get(ENDPOINT)
			.set('authorization', token)
			.expect(200)
			.expect((res) => {
				expect(res.body.users.length).toBe(2);
			})
			.end(done);
	});
	it('should get a user by id', (done) => {
		request(app)
			.get(`${ENDPOINT}/${testUser._id}`)
			.set('authorization', token)
			.expect(200)
			.expect((res) => {
				expect(res.body.email).toBe(testUser.email);
			})
			.end(done);
	});
});

