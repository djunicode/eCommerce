import mongoose from 'mongoose';

const cartSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    contents: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
        isOptionSelected: {
          type: Boolean,
          default: false,
          required: true,
        },
        // can be of Actual or of Option
        optionName: {
          type: String,
          required: true,
        },
        // can be of Actual or of Option
        price: {
          type: Number,
          required: true,
          default: 0,
        },
        // can be of Actual or of Option
        quantity: {
          type: Number,
          required: true,
          default: 0,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
