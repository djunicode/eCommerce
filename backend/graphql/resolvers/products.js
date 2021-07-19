import Product from '../../models/productModel.js';
import { admin, loggedin } from '../../utils/verifyUser.js';

// Create new product
// private/admin
const createProduct = async (args, {req, redis}) => {
  try {
    if (admin(req)) {
      const product = new Product({
        name: args.productInput.name,
        discount: args.productInput.discount,
        price: args.productInput.price,
        options: args.productInput.options,
        user: req.user,
        image: args.productInput.image,
        brand: args.productInput.brand,
        category: args.productInput.category,
        subcategory: args.productInput.subcategory,
        new: args.productInput.new,
        countInStock: args.productInput.countInStock,
        numReviews: args.productInput.numReviews,
        description: args.productInput.description,
      });
      const res = await product.save();
      return res;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// get all products
// private
// cached
const getProducts = async (args, { req, redis }) => {
  try {
    if (admin(req)) {
      const products = await redis.get('products:all');

      if (products) {
        return JSON.parse(products);
      } else {
        const products = await Product.find({}).populate(
          'user brand category subcategory'
        );

        if (products) {
          redis.setex(
            'products:all',
            process.env.SLOW_CACHE,
            JSON.stringify(products)
          );
          return products;
        } else {
          throw new Error('No Products found');
        }
      }
    }
  } catch (err) {
    throw err;
  }
};

// get product by category
// public
// cached
const getProductByCategory = async (args, { req, redis }) => {
  try {
    const products = await redis.get('category:products:' + args.categoryId);

    if (products) {
      return JSON.parse(products);
    } else {
      const products = await Product.find({
        category: args.categoryId,
      }).populate('user brand category subcategory');

      if (products) {
        redis.setex(
          'category:products:' + args.categoryId,
          process.env.FAST_CACHE,
          JSON.stringify(products)
        );
        return products;
      } else {
        throw new Error('Product not found');
      }
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// get product by sub category
// public
// cached
const getProductBySubCategory = async (args, { req, redis }) => {
  try {
    const products = await redis.get(
      'subcategory:products:' + args.subCategoryId
    );

    if (products) {
      return JSON.parse(products);
    } else {
      const products = await Product.find({
        subcategory: args.subCategoryId,
      }).populate('user brand category subcategory');

      if (products) {
        redis.setex(
          'subcategory:products:' + args.subCategoryId,
          process.env.FAST_CACHE,
          JSON.stringify(products)
        );
        return products;
      } else {
        throw new Error('Product not found');
      }
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// get product by id
// public
// cached
const getProductById = async (args, { req, redis }) => {
  try {
    const products = await redis.get('product:' + args.id);

    if (products) {
      return JSON.parse(products);
    } else {
      const products = await Product.find({ _id: args.id }).populate(
        'user brand category subcategory'
      );

      if (products) {
        redis.setex(
          'product:' + args.id,
          process.env.FAST_CACHE,
          JSON.stringify(products)
        );
        return products;
      } else {
        throw new Error('Product not found');
      }
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// new products
// public
// cached
const getNewProducts = async (args, { req, redis }) => {
  try {
    const products = await redis.get('products:new');

    if (products) {
      return JSON.parse(products);
    } else {
      const products = await Product.find({ new: true }).populate(
        'user brand category subcategory'
      );

      if (products) {
        redis.setex(
          'products:new',
          process.env.FAST_CACHE,
          JSON.stringify(products)
        );
        return products;
      } else {
        throw new Error('Product not found');
      }
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// update product
// private/admin
const updateProduct = async (args, { req, redis }) => {
  try {
    if (admin(req)) {
      const product = await Product.findById(args.productId);
      if (!product) {
        throw new Error('Product not found');
      }

      const newUpdatedProduct = {
        name: args.updateProduct.name,
        discount: args.updateProduct.discount,
        price: args.updateProduct.price,
        options: args.updateProduct.options,
        image: args.updateProduct.image,
        brand: args.updateProduct.brand,
        category: args.updateProduct.category,
        countInStock: args.updateProduct.countInStock,
        description: args.updateProduct.description,
      };

      await Product.findByIdAndUpdate(args.productId, {
        $set: newUpdatedProduct,
      });
      const updatedProduct = await Product.findById(args.productId);
      return updatedProduct;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// delete product
// private/admin
const deleteProduct = async (args, { req, redis }) => {
  try {
    if (admin(req)) {
      const product = await Product.find({ _id: args.id });
      if (product) {
        const deleted = await Product.findByIdAndDelete(args.id);
        return { ...deleted._doc };
      } else {
        throw new Error('Product not found');
      }
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

//add product review
//private/
const createProductReview = async (args, {req}) => {
  try {
    if (loggedin(req)) {
      const product = await Product.find({ _id: args.productId });
      
      if (product) {
        let reviews = product[0].reviews;
        let numReviews = product[0].numReviews;
        let avgRate = product[0].avgRating * numReviews + args.productReview.rating;
        numReviews = product[0].reviews.length + 1;
        avgRate = avgRate / numReviews;
        
        const review = {
          name: args.productReview.name,
          rating: args.productReview.rating,
          comment: args.productReview.comment,
          date: args.productReview.date,
          user: req.user,
        };
        reviews.push(review);
        
        const updatedProduct = {
          reviews: reviews,
          numReviews: numReviews,
          avgRating: avgRate,
        };
        
        await Product.findByIdAndUpdate(args.productId, {
          $set: updatedProduct,
        });
        const newUpdatedProduct = await Product.findById(args.productId);
        return newUpdatedProduct;
      } else {
        throw new Error('Product not found');
      }
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

//get product reviews
//public
const getProductReviews = async (args) => {
  try {
    const product = await Product.find({ _id: args.productId });
    if (product) {
      const reviews = product[0].reviews;
      return reviews;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

//add product questions
//private/
const createProductQuestion = async (args, req) => {
  try {
    if (loggedin(req)) {
      const product = await Product.find({ _id: args.productId });
      if (product) {
        let questions = product[0].questions;
        const question = {
          question: args.question,
        };
        questions.push(question);
        const updatedProduct = {
          questions: questions,
        };
        await Product.findByIdAndUpdate(args.productId, {
          $set: updatedProduct,
        });
        const newUpdatedProduct = await Product.findById(args.productId);
        return newUpdatedProduct;
      }
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

//add product answers
//private/
const createProductAnswer = async (args, req) => {
  try {
    if (loggedin(req)) {
      const product = await Product.find({ _id: args.productId });
      if (product) {
        let questions = product[0].questions;

        questions[args.Qindex] = {
          question: questions[args.Qindex].question,
          answer: args.answer,
        };

        const updatedProduct = {
          questions: questions,
        };
        await Product.findByIdAndUpdate(args.productId, {
          $set: updatedProduct,
        });
        const newUpdatedProduct = await Product.findById(args.productId);
        return newUpdatedProduct;
      }
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

//get product QnAs
//public
const getProductQnAs = async (args) => {
  try {
    const product = await Product.find({ _id: args.productId });
    if (product) {
      const questions = product[0].questions;
      return questions;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export {
  createProduct,
  getProducts,
  getProductByCategory,
  getProductBySubCategory,
  getProductById,
  getNewProducts,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  createProductQuestion,
  createProductAnswer,
  getProductQnAs,
};
