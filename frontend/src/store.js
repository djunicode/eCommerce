/* eslint-disable import/named */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer,
  productTopRatedReducer,
  productSearchReducer,
  productByCategoryReducer,
  productBySubCategoryReducer,
} from './reducers/productReducers';
import cartReducer, { cartAddReducer } from './reducers/cartReducers';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducers';
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderDeliverReducer,
  orderListMyReducer,
  orderListReducer,
} from './reducers/orderReducers';
import { searchReducer } from './reducers/searchReducers';
import { filterReducer } from './reducers/filterReducers';
import {
  chatbotReducer,
  updateChatbot,
} from './reducers/chatbotReducers';
import {
  productidReducer,
  pincodeReducer,
} from './reducers/productidReducers';
import {
  productsByCategoryIdReducer,
  categoryCreateReducer,
  categoryDeleteReducer,
  categoryEditReducer,
  categoryListReducer,
  subCategoryCreateReducer,
  subCategoryDeleteReducer,
  subCategoryEditReducer,
  subCategoryListReducer,
} from './reducers/categoryReducers';
import {
  brandCreateReducer,
  brandDeleteReducer,
  brandEditReducer,
  brandListReducer,
} from './reducers/brandReducers';
import postAddressReducer from './reducers/checkOutReducers';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  productTopRated: productTopRatedReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
  search: searchReducer,
  filter: filterReducer,
  chatbot: chatbotReducer,
  productid: productidReducer,
  productsByCategory: productsByCategoryIdReducer,
  categoryList: categoryListReducer,
  subCategoryList: subCategoryListReducer,
  productSearch: productSearchReducer,
  productByCategory: productByCategoryReducer,
  productBySubCategory: productBySubCategoryReducer,
  categoryCreate: categoryCreateReducer,
  categoryEdit: categoryEditReducer,
  categoryDelete: categoryDeleteReducer,
  subCategoryCreate: subCategoryCreateReducer,
  subCategoryEdit: subCategoryEditReducer,
  subCategoryDelete: subCategoryDeleteReducer,
  brandList: brandListReducer,
  brandCreate: brandCreateReducer,
  brandDelete: brandDeleteReducer,
  brandEdit: brandEditReducer,
  updateChatbot,
  checkPincode: pincodeReducer,
  cartAdd: cartAddReducer,
  addAddress: postAddressReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const shippingAddressFromStorage = localStorage.getItem(
  'shippingAddress',
)
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
