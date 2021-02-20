import Product from '../../models/productModel.js';
import Brand from '../../models/brandModel.js';
import { admin, loggedin } from '../../utils/verifyUser.js';

// Create new product
// private/admin
const createProduct = async (args, req) => {
  try {
    if (admin(req)) {
      const newBrand = new Brand({
        name: args.productInput.brand,
      });

      const resp = await newBrand.save();

      const product = new Product({
        name: args.productInput.name,
        discount: args.productInput.discount,
        price: args.productInput.price,
        discountedPrice:
          ((100 - args.productInput.discount) * args.productInput.price) / 100,
        user: args.productInput.user,
        image: args.productInput.image,
        brand: resp._id,
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
        res.status(404);
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
        res.status(404);
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
        res.status(404);
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
    const products = await redis.get('newproducts');

    if (products) {
      return JSON.parse(products);
    } else {
      const products = await Product.find({ new: true }).populate(
        'user brand category subcategory'
      );

      if (products) {
        redis.setex(
          'newproducts',
          process.env.FAST_CACHE,
          JSON.stringify(products)
        );
        return products;
      } else {
        res.status(404);
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
      // console.log(args.productId);
      // console.log(args);
      const product = await Product.findById(args.productId);
      if (!product) {
        res.status(404);
        throw new Error('Product not found');
      }

      await Brand.deleteOne({ _id: product.brand });

      const newBrand = new Brand({
        name: args.updateProduct.brand,
      });

      const resp = await newBrand.save();

      const newUpdatedProduct = {
        name: args.updateProduct.name,
        price: args.updateProduct.price,
        image: args.updateProduct.image,
        brand: resp._id,
        category: args.updateProduct.category,
        countInStock: args.updateProduct.countInStock,
        description: args.updateProduct.description,
      };

      await Product.findByIdAndUpdate(args.productId, {
        $set: newUpdatedProduct,
      });
      const updatedProduct = await Product.findById(args.productId);
      console.log(updatedProduct);
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
        await Brand.deleteOne({ _id: product.brand });
        const deleted = await Product.findByIdAndDelete(args.id);
        // console.log(deleted);
        return { ...deleted._doc };
      } else {
        res.status(404);
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
const createProductReview = async (args, req) => {
  try {
    if(loggedin(req)) {
      const product = await Product.find({ _id: args.productId });
      if(product) {
        let reviews = product[0].reviews;
        let numReviews = product[0].numReviews;
        numReviews = product[0].reviews.length + 1;
        const review = {
          name: args.productReview.name,
          rating: args.productReview.rating,
          comment: args.productReview.comment,
          user: args.productReview.user
        }
        reviews.push(review);
        const updatedProduct = {
          reviews: reviews,
          numReviews: numReviews,
        }
        await Product.findByIdAndUpdate(args.productId, {$set: updatedProduct,});
        const newUpdatedProduct = await Product.findById(args.productId);
        return newUpdatedProduct;
      }
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

//get product reviews
//public
const getProductReviews = async (args) => {
  try {
    const product = await Product.find({ _id: args.productId });
    if(product) {
      const reviews = product[0].reviews;
      // console.log(reviews);
      return reviews;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export {
  createProduct,
  getProductByCategory,
  getProductBySubCategory,
  getProductById,
  getNewProducts,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
};
