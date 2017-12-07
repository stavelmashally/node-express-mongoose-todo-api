const User = require('../users/user-model');
const bcrypt = require('bcrypt');
const AppError = require('../helpers/AppError');

exports.login = async (req, res, next) => {
	const username = req.body.username;
	const password = req.body.password;
	try {
		const user = await User.findOne({ username });
		if (!user) {
			return next(new AppError(`${username} does not exist`, 401));
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (isMatch) {
			const token = user.generateToken();
			return res.json({
				username,
				token,
			});
		}
		return next(new AppError('Wrong password', 401));
	} catch (err) {
		return next(err);
	}
};

exports.register = async (req, res, next) => {
	try {
		const user = await User.create(req.body);
		return res.json(user);
	} catch (err) {
		return next(err);
	}
};
