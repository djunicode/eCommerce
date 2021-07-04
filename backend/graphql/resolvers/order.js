import Order from '../../models/orderModel.js';
import Product from '../../models/productModel.js';
import { loggedin, admin } from '../../utils/verifyUser.js';
import pincode from '../../pincodes.js';
import { sendEmail } from '../../utils/mailer.js';
import User from '../../models/userModel.js';

// PS: After .save(), user & product are not populated and can't be queried via graphql

// Create new order
// Private
const addOrderItems = async (args, { req, redis }) => {
  try {
    if (loggedin(req)) {
      let tally = 0;
      args.orderInput.orderItems.forEach(async (item) => {
        const product =  await Product.findById(item.product);
        tally+=(((100 - product.discount) * product.price) / 100);
      });
      if(Math.abs(tally-args.orderInput.totalPrice)<=0.001) {   //precision upto 3 decimal places
        throw new Error("Price Mismatch, please update order");
      }
      const order = new Order({
        user: req.user._id,
        orderItems: args.orderInput.orderItems,
        shippingAddress: args.orderInput.shippingAddress,
        paymentMethod: args.orderInput.paymentMethod,
        paymentResult: args.orderInput.paymentResult,
        taxPrice: args.orderInput.taxPrice,
        shippingPrice: args.orderInput.shippingPrice,
        totalPrice: args.orderInput.totalPrice,
        isPaid: args.orderInput.isPaid,
        isDelivered: args.orderInput.isDelivered,
      });

      if (args.orderInput.paidAt) {
        order.paidAt = new Date(args.orderInput.paidAt);
      }

      if (args.orderInput.deliveredAt) {
        order.deliveredAt = new Date(args.orderInput.deliveredAt);
      }
      const res = await order.save();
      const user = await User.findById(req.user._id);
      sendEmail(user.name, user.email, 'Order Placed Successfully!', 'your order has been placed successfully.')
      return res;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// Get order by ID
// Private
const getOrderById = async (args, { req, redis }) => {
  try {
    if (loggedin(req)) {
      const order = await Order.findById(args.orderId).populate(
        'user orderItems.product'
      );

      if (order && order._id === req.user._id) {
        return order;
      } else {
        throw new Error('Order not found!!');
      }
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// Update order to paid
// Private
// To be called via payment resolver once implemented
const updateOrderToPaid = async (args, { req, redis }) => {
  try {
    if (loggedin(req)) {
      const order = await Order.findById(args.orderId);

      if (order && order._id === req.user._id) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = args.paymentResult;

        const updatedOrder = await order.save();
        return updatedOrder;
      } else {
        throw new Error('Order not found!!');
      }
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// Update order to delivered
// Private/Admin
const updateOrderToDelivered = async (args, { req, redis }) => {
  try {
    // if (admin(req)) {
      const order = await Order.findById(args.orderId);

      if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        const updatedOrder = await order.save();
        const user = await User.findById(order.user);
        sendEmail(user.name, user.email, 'Order Delivered Successfully!', 'your order has been delivered successfully.')
        return updatedOrder;
      } else {
        throw new Error('Order not found!!');
      }
    // }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// Get logged in user orders
// Private
const getMyOrders = async (args, { req, redis }) => {
  try {
    if (loggedin(req)) {
      const orders = await Order.find({ user: req.user._id }).populate(
        'user orderItems.product'
      );

      return orders.map((order) => {
        return {
          ...order._doc,
          // Here try/catch maybe?
          deliveredAt:
            order._doc.deliveredAt != null
              ? order._doc.deliveredAt.toISOString()
              : null,
          paidAt:
            order._doc.paidAt != null ? order._doc.paidAt.toISOString() : null,
        };
      });
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// Get all orders
// Private/Admin
const getOrders = async (args, { req, redis }) => {
  try {
    // if (admin(req)) {
      const orders = await Order.find({}).populate('user orderItems.product');

      return orders.map((order) => {
        return {
          ...order._doc,
          // Here try/catch maybe?
          deliveredAt:
            order._doc.deliveredAt != null
              ? order._doc.deliveredAt.toISOString()
              : null,
          paidAt:
            order._doc.paidAt != null ? order._doc.paidAt.toISOString() : null,
        };
      });
    // }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

//is deliverable
//private
const isDeliverable = async (args, {req}) => {
  try {
    if (loggedin(req)) {  
      const pin = args.postalCode;
      if (pin.length != 6) {
        return false;
      } else {
        var q = false;
        for (var a = 0; a < pincode.pincode.length; a++) {
          if (pin == pincode.pincode[a]) {
            q = true;
          }
        }
        return q;
      }
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  isDeliverable,
};
