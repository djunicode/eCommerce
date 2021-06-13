import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  addUserAddress,
  deleteUserAddress,
} from './user.js';

import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  isDeliverable,
} from './order.js';

import {
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
} from './products.js';

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getSubCategories,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
} from './category.js';

import {
  getBrands,
  createBrand,
  updateBrand,
  deleteBrand,
} from './brand.js';

import { questions, question, editQuestions } from './chatbot.js';

import { getCart, updateCart } from './cart.js';

import { filterProducts } from './productFilter.js';

import { searchProduct } from './search.js';

export default {
  //users
  authUser: authUser,
  registerUser: registerUser,
  getUserProfile: getUserProfile,
  updateUserProfile: updateUserProfile,
  getUsers: getUsers,
  deleteUser: deleteUser,
  getUserById: getUserById,
  updateUser: updateUser,
  addUserAddress: addUserAddress,
  deleteUserAddress: deleteUserAddress,
  //brand
  createBrand: createBrand,
  getBrands: getBrands,
  updateBrand: updateBrand,
  deleteBrand: deleteBrand,
  //categories
  createCategory: createCategory,
  getCategories: getCategories,
  updateCategory: updateCategory,
  deleteCategory: deleteCategory,
  //subcategories
  createSubCategory: createSubCategory,
  getSubCategories: getSubCategories,
  updateSubCategory: updateSubCategory,
  deleteSubCategory: deleteSubCategory,
  //products
  createProduct: createProduct,
  getProducts: getProducts,
  getProductByCategory: getProductByCategory,
  getProductBySubCategory: getProductBySubCategory,
  getProductById: getProductById,
  getNewProducts: getNewProducts,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
  createProductReview: createProductReview,
  getProductReviews: getProductReviews,
  createProductQuestion: createProductQuestion,
  createProductAnswer: createProductAnswer,
  getProductQnAs: getProductQnAs,
  //cart
  getCart: getCart,
  updateCart: updateCart,
  //orders
  orders: getOrders,
  myorders: getMyOrders,
  orderById: getOrderById,
  createOrder: addOrderItems,
  updateOrderToPaid: updateOrderToPaid,
  updateOrderToDelivered: updateOrderToDelivered,
  //chatbot
  questions: questions,
  question: question,
  editQuestions: editQuestions,
  //search
  searchProduct: searchProduct,
  //filterProducts
  filterProducts: filterProducts,
};
