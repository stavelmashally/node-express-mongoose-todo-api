const express = require('express');
const passport = require('../../config/passport')();
const userCtrl = require('../users/user-controller');
const authCtrl = require('../authentication/auth-controller');
const todoCtrl = require('../todos/todo-controller');

const router = express.Router();

router.route('/login')
	.post((...params) => authCtrl.login(...params));

router.route('/register')
	.post((...params) => authCtrl.register(...params));

router.route('/me')
	.get((...params) => authCtrl.checkAuth(...params));

router.route('/users')
	.get(passport.authenticate(), (...params) => userCtrl.list(...params));

router.route('/users/:id')
	.get(passport.authenticate(), (...params) => userCtrl.getById(...params))
	.patch(passport.authenticate(), (...params) => userCtrl.update(...params));

router.route('/todos')
	.get(passport.authenticate(), (...params) => todoCtrl.list(...params))
	.post(passport.authenticate(), (...params) => todoCtrl.create(...params));

router.route('/todos/:id')
	.get(passport.authenticate(), (...params) => todoCtrl.getById(...params))
	.delete(passport.authenticate(), (...params) => todoCtrl.removeById(...params))
	.patch(passport.authenticate(), (...params) => todoCtrl.update(...params));

module.exports = router;
