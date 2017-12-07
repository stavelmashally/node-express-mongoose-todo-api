const mongoose = require('mongoose');
const config = require('../../config/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: [4, 'username most contain at least 4 characters'],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/, 'Invalid email'],
    },
   password: {
       type: String,
       required: true,
       minlength: [6, 'password should contain at least 6 characters'],
    },
});

// validations before registration
userSchema.path('username').validate(async (username) => {
	const count = await mongoose.model('User').count({ username });
	return !count;
}, 'username has already used');

userSchema.path('email').validate(async (email) => {
    const count = await mongoose.model('User').count({ email });
    return !count;
}, 'email has already used');

// hash password before saving the user
userSchema.pre('save', async function (next) {
    try {
        const user = this;
        if (!user.isModified('password')) {
            return next();
		}
		user.password = await bcrypt.hash(user.password, 10);
		return next();
    } catch (e) {
        return next(e);
    }
});

userSchema.methods = {
    generateToken: () => jwt.sign(this, config.jwtSecret),
};


module.exports = mongoose.model('User', userSchema);
