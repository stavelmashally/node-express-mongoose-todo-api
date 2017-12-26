/* eslint-disable no-undef */
const expect = require('expect');
const request = require('supertest');
const { app } = require('../../../index');
const { ObjectID } = require('mongodb');
const Todo = require('../../todos/todo-model');
const { testTodo, populateTodo, token } = require('../seed/seed');

const ENDPOINT = '/todos';

describe(`POST ${ENDPOINT}`, () => {
	before(populateTodo);
	const text = 'example todo';
	it('should create a new todo', (done) => {
		request(app)
			.post(ENDPOINT)
			.set('authorization', token)
			.send({ text })
			.expect(200)
			.end(async (err, res) => {
				if (err) {
					return done(err);
				}
				expect(res.body.text).toBe(text);
				const todos = await Todo.find({text});
				expect(todos.length).toBe(1);
				return done();
			});
	});
	it('should not create todo with invalid body data', (done) => {
		request(app)
			.post(ENDPOINT)
			.set('authorization', token)
			.send({})
			.expect(400)
			.end(async (err, res) => {
				if (err) {
					return done(err);
				}
				const todos = await Todo.find();
				expect(todos.length).toBe(2);
				return done();
			});
	});
});

describe(`GET ${ENDPOINT}`, () => {
	it('should get all todos', (done) => {
		request(app)
			.get(ENDPOINT)
			.set('authorization', token)
			.expect(200)
			.end(async (err, res) => {
				if (err) {
					return done(err);
				}
				expect(res.body.todos.length).toBe(2);
				return done();
			});
	});
	it('should return todo by id', (done) => {
		request(app)
			.get(`${ENDPOINT}/${testTodo._id}`)
			.set('authorization', token)
			.expect(200)
			.end(async (err, res) => {
				if (err) {
					return done(err);
				}
				expect(res.body.text).toBe(testTodo.text);
				return done();
			});
	});
	it('should return 404 if todo not found', (done) => {
		request(app)
			.get(`${ENDPOINT}/${new ObjectID()}`)
			.set('authorization', token)
			.expect(404)
			.end(done);
	});
});

describe(`PATCH ${ENDPOINT}`, () => {
	it('should update todo', (done) => {
		request(app)
			.patch(`${ENDPOINT}/${testTodo._id}`)
			.set('authorization', token)
			.send({ completed: true })
			.expect(200)
			.end(async (err, res) => {
				if (err) {
					return done(err);
				}
				expect(res.body.completed).toBe(true);
				expect(res.body.completedAt).toBeA('number');
				return done();
			});
	});
});

describe(`DELETE ${ENDPOINT}`, () => {
	it('should remove todo', (done) => {
		const id = testTodo._id.toString();
		request(app)
			.delete(`${ENDPOINT}/${id}`)
			.set('authorization', token)
			.expect(200)
			.end(async (err, res) => {
				if (err) {
					return done(err);
				}
				expect(res.body._id).toBe(id);
				const todo = await Todo.findById(id);
				expect(todo).toNotExist();
				return done();
			});
	});
});
