import chai from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../server.js';

chai.use(chaiHttp);
chai.should();

let tokenString, userId, productId, productName, categoryId;

productId = productName = 'if you see this, createProductQuery has failed';

// Not implemented: Get all products, get products by category, get all categories, add reviews to product
// Their corressponding tests are commented out until implemented
// Also, for all queries, subdocuments are not populated, remove their details from graphql queries until implemented
// This unit is not authenticated, all types of users should have same results

const runTests = (userType) => {
  describe(`Product routes: ${userType}`, () => {
    before((done) => {
      tokenString = `if you see this, the ${userType} login query has failed`;
      userId = `if you see this, the ${userType} login query has failed`;

      let loginQuery = {
        query: `
          query {
            authUser (
              email: "${userType == 'admin' ? 'admin' : 'john'}@example.com",
              password: "123456",
            ) {
              _id
              token
            }
          }
        `,
      };

      let categoryQuery = {
        query: `
          query {
            getCategories {
              name
            }
          }
        `,
      };

      chai
        .request(server)
        .post('/graphql')
        .send(loginQuery)
        .end((err, res) => {
          if (err) {
            console.log(err);
            done(err);
          }

          if (res.body.errors) {
            console.log(res.body.errors);
            done(new Error('GraphQL Error'));
          }

          tokenString =
            userType == 'guest' ? '' : `Bearer ${res.body.data.authUser.token}`;
          userId = res.body.data.authUser._id;
        });

      chai
        .request(server)
        .post('/graphql')
        .send(categoryQuery)
        .end((err, res) => {
          if (err) {
            console.log(err);
            done(err);
          }

          if (res.body.errors) {
            console.log(res.body.errors);
            done(new Error('GraphQL Error'));
          }

          categoryId = res.body.getCategories[0]._id;
        });

      done();
    });

    describe('Create product', () => {
      it('Create a product and return the product object', (done) => {
        let createProductQuery = {
          query: `
            mutation{    
              createProduct (productInput: {
                name: "Big Box",
                price: 99.99,
                user: "${userId}",
                image: "to be updated once upload is added",
                brand: "Big Box Makers",
                category: "${categoryId}",
                countInStock: 7,
                numReviews: 0,
                description: "It's a box yeah"
              }) {
                _id
                name
                price
                user {
                  _id
                  name
                  email
                  password
                  isAdmin
                  token
                }
                image
                brand
                category
                countInStock
                numReviews
                description
              }
            }
          `,
        };

        chai
          .request(server)
          .post('/graphql')
          .set({ Authorization: tokenString })
          .send(createProductQuery)
          .end((err, res) => {
            if (err) {
              console.log(err);
              done(err);
            }

            res.body.should.be.a('object');

            if (res.body.errors) {
              console.log(res.body.errors);
              done(new Error('GraphQL Error'));
            }

            productId = res.body.data._id;
            productName = res.body.data.name;

            done();
          });
      });
    });

    describe('Update product', () => {
      it('Update a product and return the product object', (done) => {
        let updateProductQuery = {
          query: `
          mutation{    
            updateProduct (productId: "${productId}", updateProduct: {
              name: "Small Box",
              price: 49.99,
              image: "to be updated once upload is added",
              brand: "Small Box Makers",
              category: "${categoryId}",
              countInStock: 3,
              description: "It's smaller than big box"
            }) {
              _id
              name
              price
              user {
                _id
                name
                email
                password
                isAdmin
                token
              }
              image
              brand
              category
              countInStock
              numReviews
              description
            }
          }
        `,
        };

        chai
          .request(server)
          .post('/graphql')
          .set({ Authorization: tokenString })
          .send(updateProductQuery)
          .end((err, res) => {
            if (err) {
              console.log(err);
              done(err);
            }

            res.body.should.be.a('object');

            if (res.body.errors) {
              console.log(res.body.errors);
              done(new Error('GraphQL Error'));
            }

            done();
          });
      });
    });

    describe('Get all products', () => {
      it('should return all products', (done) => {
        let getAllProductsQuery = {
          query: `
            query {    
              getAllProducts {
                _id
                name
                price
                user {
                  _id
                  name
                  email
                  password
                  isAdmin
                  token
                }
                image
                brand
                category
                countInStock
                numReviews
                description
              }
            }
            `,
        };

        chai
          .request(server)
          .post('/graphql')
          .set({ Authorization: tokenString })
          .send(getAllProductsQuery)
          .end((err, res) => {
            if (err) {
              console.log(err);
              done(err);
            }

            res.body.should.be.a('object');

            if (res.body.errors) {
              console.log(res.body.errors);
              done(new Error('GraphQL Error'));
            }

            done();
          });
      });
    });

    describe('Get product by id', () => {
      it('Get a product by ID', (done) => {
        let getProductByIdQuery = {
          query: `
            query {    
              getProductById(id: "${productId}") {
                _id
                name
                price
                user {
                  _id
                  name
                  email
                  password
                  isAdmin
                  token
                }
                image
                brand
                category
                countInStock
                numReviews
                description
              }
            }
          `,
        };

        chai
          .request(server)
          .post('/graphql')
          .set({ Authorization: tokenString })
          .send(getProductByIdQuery)
          .end((err, res) => {
            if (err) {
              console.log(err);
              done(err);
            }

            res.body.should.be.a('object');

            if (res.body.errors) {
              console.log(res.body.errors);
              done(new Error('GraphQL Error'));
            }

            done();
          });
      });
    });

    describe('Get product by name', () => {
      it('Get a product by name', (done) => {
        let getProductByNameQuery = {
          query: `
            query {    
              getProduct(name: "${productName}") {
                _id
                name
                price
                user {
                  _id
                  name
                  email
                  password
                  isAdmin
                  token
                }
                image
                brand
                category
                countInStock
                numReviews
                description
              }
            }
            `,
        };

        chai
          .request(server)
          .post('/graphql')
          .set({ Authorization: tokenString })
          .send(getProductByNameQuery)
          .end((err, res) => {
            if (err) {
              console.log(err);
              done(err);
            }

            res.body.should.be.a('object');

            if (res.body.errors) {
              console.log(res.body.errors);
              done(new Error('GraphQL Error'));
            }

            done();
          });
      });
    });

    describe('Get product by category', () => {
      it('Get a product by category', (done) => {
        let getProductsByCategoryQuery = {
          query: `
            query {    
              getProductByCategory(category: "${categoryId}") {
                _id
                name
                price
                user {
                  _id
                  name
                  email
                  password
                  isAdmin
                  token
                }
                image
                brand
                category
                countInStock
                numReviews
                description
              }
            }
          `,
        };

        chai
          .request(server)
          .post('/graphql')
          .set({ Authorization: tokenString })
          .send(getProductsByCategoryQuery)
          .end((err, res) => {
            if (err) {
              console.log(err);
              done(err);
            }

            res.body.should.be.a('object');

            if (res.body.errors) {
              console.log(res.body.errors);
              done(new Error('GraphQL Error'));
            }

            done();
          });
      });
    });

    describe('Add product reviews', () => {
      it('Should add reviews to a product and return success response', (done) => {
        let createProductReviewQuery = {
          query: `
            mutation {    
              createProductReview (id: "${productId}", review: {
                rating: 5
                comment: "Test review"
              }) {
                _id
                name
                price
                user {
                  _id
                  name
                  email
                  password
                  isAdmin
                  token
                }
                image
                brand
                category
                countInStock
                numReviews
                reviews {
                  rating
                  comment
                }
                description
              }
            }
          `,
        };

        chai
          .request(server)
          .post('/graphql')
          .set({ Authorization: tokenString })
          .send(createProductReviewQuery)
          .end((err, res) => {
            if (err) {
              console.log(err);
            }

            res.body.should.be.a('object');

            if (res.body.errors) {
              console.log(res.body.errors);
              done(new Error('GraphQL Error'));
            }

            done();
          });
      });
    });

    describe('Delete product', () => {
      it('Delete a product and return the success message', (done) => {
        let deleteProductQuery = {
          query: `
            query {    
              deleteProduct(id: "${productId}") {
                _id
                name
                price
                user {
                  _id
                  name
                  email
                  password
                  isAdmin
                  token
                }
                image
                brand
                category
                countInStock
                numReviews
                description
              }
            }
          `,
        };

        chai
          .request(server)
          .post('/graphql')
          .set({ Authorization: tokenString })
          .send(deleteProductQuery)
          .end((err, res) => {
            if (err) {
              console.log(err);
              done(err);
            }

            res.body.should.be.a('object');

            if (res.body.errors) {
              console.log(res.body.errors);
              done(new Error('GraphQL Error'));
            }

            done();
          });
      });
    });
  });
};

runTests('admin');
runTests('user');
runTests('guest');
