import chai from 'chai';
import chaiHttp from "chai-http";
import app from '../server.js'

chai.use(chaiHttp);
chai.should();

import {
    authUserQuery,
    createOrderQuery,
    getOrderQuery,
    updateOrderToPaidQuery,
    updateOrderToDeliveredQuery,
    getMyOrdersQuery,
    getAllOrdersQuery
} from './ordersQuery.js';

let token;

describe('Order routes', () => {
    before((done) => {
        chai.request('http://localhost:5000')
            .get('/graphql')
            .send(authUserQuery)
            .end((err, res) => {
                if (err) console.log(err);
                token = res.body.data.authUser.token;
                console.log(token);
                done();
            });
    });
    describe('Create order', () => {
        it('should create an order', (done) => {
            chai.request('http://localhost:5000')
                .post('/graphql')
                .set({ Authorization: `Bearer ${token}` })
                .send(createOrderQuery)
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
    describe('Get order by id', () => {
        it('should return an order', (done) => {
            chai.request('http://localhost:5000')
                .get('/graphql')
                .set({ Authorization: `Bearer ${token}` })
                .send(getOrderQuery)
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
    describe('Update order to be paid', () => {
        it('should update and return an order', (done) => {
            chai.request('http://localhost:5000')
                .post('/graphql')
                .set({ Authorization: `Bearer ${token}` })
                .send(updateOrderToPaidQuery)
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
    describe('Update order to be delivered', () => {
        it('should update and return an order', (done) => {
            chai.request('http://localhost:5000')
                .post('/graphql')
                .set({ Authorization: `Bearer ${token}` })
                .send(updateOrderToDeliveredQuery)
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
    describe('Get all of my orders', () => {
        it('should return all order', (done) => {
            chai.request('http://localhost:5000')
                .get('/graphql')
                .set({ Authorization: `Bearer ${token}` })
                .send(getMyOrdersQuery)
                .end((err, res) => {
                    if(err) {
                        console.log(err);
                    }
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    done();
                })
        })
    })
    describe('Get all orders', () => {
        it('should return all order', (done) => {
            chai.request('http://localhost:5000')
                .get('/graphql')
                .set({ Authorization: `Bearer ${token}` })
                .send(getAllOrdersQuery)
                .end((err, res) => {
                    if(err) {
                        console.log(err);
                    }
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    done();
                })
        })
    })
})
