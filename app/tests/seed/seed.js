const User = require('../../users/user-model');
const Todo = require('../../todos/todo-model');
const { ObjectID } = require('mongodb');
const config = require('../../../config/config');
const jwt = require('jsonwebtoken');

const userId = new ObjectID();

const testUser = {
	_id: userId,
	email: 'user@gmail.com',
	password: '123456',
};

const token = jwt.sign(testUser, config.jwtSecret);

const testTodo = {
	_id: new ObjectID(),
	text: 'user todo',
	_creator: userId,
};

const populateUser = async () => {
	await User.remove({});
	await User.create(testUser);
};

const populateTodo = async () => {
	await Todo.remove({});
	await Todo.create(testTodo);
};

module.exports = {
	testUser,
	testTodo,
	populateUser,
	populateTodo,
	token,
};
