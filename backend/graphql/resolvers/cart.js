import Cart from '../../models/cartModel.js';
import { loggedin } from '../../utils/verifyUser.js';

const getCart = async (args, { req, redis }) => {
  try {
    if(loggedin(req)) {
      const myCart = await Cart.findOne({ user: req.user }).populate(
        'user contents.product'
      );
  
      if (myCart) {
        return myCart;
      } else {
        const cart = new Cart({
          user: req.user,
          contents: [], 
        });
        const res = await cart.save();
        return res;
      }
    }
  } catch (err) {
    throw err;
  }
};

const updateCart = async (args, { req, redis }) => {
  try {
    if (loggedin(req)) {
      const myCart = await Cart.findOne({ user: req.user });
  
      if (myCart) {
        const newCart = {
          contents: args.contents, 
        };

        await Cart.findOneAndUpdate({ user: req.user }, {
          $set: newCart,
        });

        return { msg: 'success' };
      } else {
        const cart = new Cart({
          user: req.user,
          contents: args.contents, 
        });
        await cart.save();

        return { msg: 'success' };  
      }
    }
  } catch (err) {
    throw err;
  }
};

export {
  getCart,
  updateCart,
};