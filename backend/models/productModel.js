import mongoose from 'mongoose';
import mongoose_fuzzy_searching from 'mongoose-fuzzy-searching';

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    date: { type: String,}
  },
  {
    timestamps: true,
  }
);

const questionSchema = mongoose.Schema(
  {
    question: { type: String, default: '' },
    answer: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Brand',
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubCategory',
    },
    new: {
      type: Boolean,
      default: false,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    options: [
      {
        name: {
          type: String,
          required: true,
        },
        discount: {
          type: Number,
          required: true,
          default: 0,
        },
        price: {
          type: Number,
          required: true,
          default: 0,
        },
        countInStock: {
          type: Number,
          required: true,
          default: 0,
        },
      },
    ],
    reviews: [reviewSchema],
    questions: [questionSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    discount: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    avgRating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.plugin(mongoose_fuzzy_searching, {
  fields: [
    {
      name: 'name',
      minSize: 2,
      weight: 5,
    },
    {
      name: 'brand',
      keys: ['name'],
      minSize: 3,
      weight: 1,
      prefixOnly: true,
    },
  ],
});

const Product = mongoose.model('Product', productSchema);

export default Product;
