import chai from 'chai';
import chaiHttp from "chai-http";
import app from '../server.js'

chai.use(chaiHttp);
chai.should();

import {
    registerUserQuery,
    authUserQuery,
    getUserProfileQuery,
    getUsersQuery,
    getUserByIdQuery,
    deleteUserQuery,
    updateUserQuery,
    updateUserProfileQuery
} from './usersQuery.js';

var token = 0;

describe('Users Routes', () => {
    before((done) => {
		chai.request('http://localhost:5000')
			.get('/graphql')
			.send(authUserQuery)
			.end((err, res) => {
                if (err) console.log(err);
                token = res.body.data.authUser.token;
                done();
			});
    });
    describe('Register a user', () => {
        it('should create a user', (done) => {
            chai.request('http://localhost:5000')
                .post('/graphql')
                .send(registerUserQuery)
                .end((err, res) => {
                    if(err) {
                        console.log(err);
                    }
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                })
        })
    })
    describe('Authenticate a user', () => {
        it('should authenticate a user', (done) => {
            chai.request('http://localhost:5000')
                .post('/graphql')
                .send(authUserQuery)
                .end((err, res) => {
                    if(err) {
                        console.log(err);
                    }
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                })
        })
    })
    describe('Get user profile', () => {
        it('should get a user profile', (done) => {
            chai.request('http://localhost:5000')
                .get('/graphql')
                .set({ Authorization: `Bearer ${token}` })
                .send(getUserProfileQuery)
                .end((err, res) => {
                    if(err) {
                        console.log(err);
                    }
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                })
        })
    })
    describe('Get users', () => {
        it('should get a user profile', (done) => {
            chai.request('http://localhost:5000')
                .get('/graphql')
                .set({ Authorization: `Bearer ${token}` })
                .send(getUsersQuery)
                .end((err, res) => {
                    if(err) {
                        console.log(err);
                    }
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                })
        })
    })
    describe('Get user by Id', () => {
        it('should get a user profile', (done) => {
            chai.request('http://localhost:5000')
                .get('/graphql')
                .set({ Authorization: `Bearer ${token}` })
                .send(getUserByIdQuery)
                .end((err, res) => {
                    if(err) {
                        console.log(err);
                    }
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                })
        })
    })
    describe('Delete user profile', () => {
        it('should delete a user profile', (done) => {
            chai.request('http://localhost:5000')
                .post('/graphql')
                .set({ Authorization: `Bearer ${token}` })
                .send(deleteUserQuery)
                .end((err, res) => {
                    if(err) {
                        console.log(err);
                    }
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                })
        })
    })
    describe('Update user profile', () => {
        it('should update a user profile', (done) => {
            chai.request('http://localhost:5000')
                .post('/graphql')
                .set({ Authorization: `Bearer ${token}` })
                .send(updateUserProfileQuery)
                .end((err, res) => {
                    if(err) {
                        console.log(err);
                    }
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                })
        })
    })
    describe('Update user', () => {
        it('should update a user', (done) => {
            chai.request('http://localhost:5000')
                .post('/graphql')
                .set({ Authorization: `Bearer ${token}` })
                .send(updateUserQuery)
                .end((err, res) => {
                    if(err) {
                        console.log(err);
                    }
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                })
        })
    })
}) 
