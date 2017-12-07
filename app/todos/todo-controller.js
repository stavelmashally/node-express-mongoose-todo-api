const Todo = require('./todo-model');
const { ObjectID } = require('mongodb');

exports.list = async (req, res, next) => {
    try {
		const todos = await Todo.find({ _creator: req.user.id });
		return res.json({ todos });
    } catch (err) {
        return next(err);
    }
};

exports.create = async (req, res, next) => {
    const todo = new Todo({
        text: req.body.text,
		_creator: req.user.id,
    });
    try {
        const savedTodo = await todo.save();
        return res.json(savedTodo);
    } catch (err) {
        return next(err);
    }
};

exports.getById = async (req, res, next) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return next();
    }
    try {
        const todo = await Todo.findOne({
			_id: id,
			_creator: req.user.id,
		});
		if (!todo) {
			return next();
		}
		return res.json(todo);
    } catch (err) {
        return next(err);
    }
};

exports.removeById = async (req, res, next) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return next();
    }
    try {
        const todo = await Todo.findOneAndRemove({
			_id: id,
			_creator: req.user.id,
		});
		if (!todo) {
			return next();
		}
		return res.json(todo);
    } catch (err) {
        return next(err);
    }
};

exports.update = async (req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    if (!ObjectID.isValid(id)) {
        return next();
    }
    if (typeof (body.completed) === 'boolean' && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }
    try {
        const todo = await Todo.findOneAndUpdate({
			_id: id,
			_creator: req.user.id,
		}, {
			$set: body,
		}, {
			new: true,
			runValidators: true,
		});
		if (!todo) {
			return next();
		}
		return res.json(todo);
    } catch (err) {
        return next(err);
    }
};
