const Todo = require('./todo-model');
const { ObjectID } = require('mongodb');

exports.list = async (req, res, next) => {
    try {
		const todos = await Todo.find({ _creator: req.user._id });
		return res.json(todos);
    } catch (err) {
        return next(err);
    }
};

exports.create = async (req, res, next) => {
    try {
        const todo = await Todo.create({
			text: req.body.text,
			_creator: req.user._id,
		});
        return res.json(todo);
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
			_creator: req.user._id,
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
			_creator: req.user._id,
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
    if (!ObjectID.isValid(id)) {
        return next();
    }
    try {
        const todo = await Todo.findOneAndUpdate({
			_id: id,
			_creator: req.user._id,
		}, {
			$set: {
				completed: true,
				completedAt: Date.now(),
			},
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
