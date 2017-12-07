
require('dotenv').config();

const envVars = process.env;

const config = {
	env: envVars.NODE_ENV,
	port: envVars.PORT,
	isTest: envVars.NODE_ENV === 'test',
	isDevelopment: envVars.NODE_ENV === 'development',
	jwtSecret: envVars.JWT_SECRET,
	db: {
		host: envVars.DB_HOST,
		port: envVars.DB_PORT,
		test: {
			host: envVars.DB_TEST,
		},
	},
};

module.exports = config;
