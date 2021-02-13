import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
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
  getProduct,
  getProductById,
  getNewProducts,
  updateProduct,
  deleteProduct,
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

import { questions, question, editQuestions } from './chatbot.js';

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
  getProduct: getProduct,
  getProductById: getProductById,
  getNewProducts: getNewProducts,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
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
