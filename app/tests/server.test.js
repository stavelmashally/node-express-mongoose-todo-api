/* eslint-disable no-undef */
const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');
const { app } = require('../../index');
const User = require('../users/user-model');
const Todo = require('../todos/todo-model');

// Dummy objects for testing
const user = new User({
	_id: new ObjectID(),
	username: 'test',
	email: 'test@gmail.com',
	password: 123456,
});

const validTodo = {
	_id: new ObjectID(),
	text: 'Test todo',
	_creator: user._id,
};


// initiate the database before each test
beforeEach((done) => {
	User.remove({}).then(() => {
		user.save();
	}).then(() => done());
	Todo.remove({}).then(() => {
		Todo.save(validTodo);
	}).then(() => done());
	done();
});

describe('POST /todos', () => {
	it('should create a new todo', (done) => {
		request(app)
			.post('/todos')
			.set('Authorization', user.generateToken())
			.send(validTodo)
			.expect(200)
			.expect((res) => {
				expect(res.body.text).toBe(validTodo.text);
			})
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				return Todo.find(validTodo.text).then((todo) => {
					expect(todo.text).toBe(validTodo.text);
					done();
				}).catch(e => done(e));
			});
	});
});

    // it('should not create todo with invalid body data', done => {
    //   request(app)
    //       .post('/todos')
    //       .send({})
    //       .expect(400)
    //       .end((err, res) =>{
    //         if (err){
    //             return done(err)
    //         }
    //         Todo.find()
    //             .then(todos => {
    //                 expect(todos.length).toBe(2);
    //                 done();
    //             })
    //             .catch(err => done(err));
    //       })
    // });

// describe('GET /todos', () => {
//    it('should get all todos', done => {
//       request(app)
//           .get('/todos')
//           .expect(200)
//           .expect(res => {
//               expect(res.body.todos.length).toBe(2);
//           })
//           .end(done);
//    });
// });
//
// describe('GET /todos/id', () => {
//    it('should return todo', done => {
//       request(app)
//           .get(`/todos/${todos[0]._id.toString()}`)
//           .expect(200)
//           .expect(res => {
//               expect(res.body.text).toBe(todos[0].text);
//           })
//           .end(done);
//    });
//
//    it('should return 404 if todo not found', done => {
//       request(app)
//           .get(`/todos/${new ObjectID().toString()}`)
//           .expect(404)
//           .end(done);
//    });
//
//    it('should return 404 for invalid id', done => {
//       request(app)
//           .get('/todos/123')
//           .expect(404)
//           .end(done);
//    });
// });
//
// describe('DELETE /todos:id', () => {
//    it('should remove todo', done => {
//        const id = todos[1]._id.toString();
//       request(app)
//           .delete(`/todos/${id}`)
//           .expect(200)
//           .expect(res => {
//               expect(res.body._id).toBe(id)
//           })
//           .end((err, res) => {
//           if (err){
//               return done(err)
//           }
//           Todo.findById(id)
//               .then(todo => {
//               expect(todo).toNotExist();
//               done()
//           })
//               .catch(e => done(e));
//           });
//    });
//
//     it('should return 404 if todo not found', (done) => {
//         const id = new ObjectID().toString();
//         request(app)
//             .delete(`/todos/${id}`)
//             .expect(404)
//             .end(done);
//     });
//
//     it('should create a new user', (done) => {
//         request(app)
//             .post('/register')
//             .send(user)
//             .expect(200)
//             .expect((res) => {
//                 expect(res.body.user.username).toBe(user.username);
//             })
//             .end(done);
//     });
// });
