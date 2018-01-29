# node-express-mongoose-todo-api
Todo App API built using Node.JS with Express, Mongoose, Passport &amp; Async\Await syntax.   
Android app: https://github.com/stavelmashally/android-mvp-todoapp


### Project structure

```
├── app
│   ├── authentication
│   ├── helpers
│   ├── routes
│   ├── tests
|   |    ├── auth
|   |    ├── seed
|   |    ├── todos
|   |    ├── users 
│   ├── todos
│   ├── users
├── config
├── .env
├── .eslintrc
├── .gitignore
├── index.js
├── package.json
├── package-lock.json
├── README.md
```
## Modules
* [express](https://www.npmjs.com/package/express)
* [passport](https://www.npmjs.com/package/passport)
* [bcrypt](https://www.npmjs.com/package/bcrypt)
* [winston](https://www.npmjs.com/package/winston)
* [dotenv](https://www.npmjs.com/package/dotenv)

## Installation
```
$ git clone https://github.com/stavelmashally/node-express-mongoose-todo-api.git
$ cd node-express-mongoose-todo-api
$ npm install  
```
Set environment variables:
```
cp .env.example .env
```
## Running Locally
```sh
# development
npm run dev

# production
npm run prod

# test
npm run test
```
