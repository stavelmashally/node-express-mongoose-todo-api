const User = require('./user-model');
const { ObjectID } = require('mongodb');

exports.getById = async (req, res, next) => {
	const id = req.params.id;
	if (!ObjectID.isValid(id)) {
		return next();
	}
	try {
		const user = await User.findById(id);
		if (!user) {
			return next();
		}
		return res.json(user);
	} catch (err) {
		return next(err);
    }
};

exports.list = async (req, res, next) => {
	try {
		const users = await User.find();
		return res.json({ users });
	} catch (e) {
        return next(e);
    }
};

exports.update = async (req, res, next) => {
	const body = req.body;
	const id = req.params.id;
	if (!ObjectID.isValid(id)) {
		return next();
	}
	try {
		const user = await User.findByIdAndUpdate(id, {
			$set: body,
		}, {
			new: true,
			runValidators: true,
		});
		if (!user) {
			return next();
		}
		return res.json(user);
    } catch (err) {
        return next(err);
    }
};
