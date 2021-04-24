import Brand from '../../models/brandModel.js';
import { loggedin, admin } from '../../utils/verifyUser.js';

// Category
const createBrand = async (args, { req, redis }) => {
  try {
    if (admin(req)) {
      const { name } = args;

      const resp = await Brand.find({ name: name });

      if (resp.length === 0) {
        const newBrand = new Brand({
          name: name,
        });
        const res = newBrand.save();
        return res;
      } else {
        throw new Error('Brand already exists');
      }
    }
  } catch (err) {
    throw err;
  }
};

// cached
const getBrands = async (args, { req, redis }) => {
  try {
    const brands = await Brand.find({});
    return brands;
  } catch (err) {
    throw err;
  }
};

const updateBrand = async (args, { req, redis }) => {
  try {
    if (admin(req)) {
      const { name, newName } = args;

      let updatedBrand = {
        name: newName,
      };
      updatedBrand = { $set: updatedBrand };

      await Brand.updateOne({ name: name }, updatedBrand).exec();

      return { msg: 'success' };
    }
  } catch (err) {
    throw err;
  }
};

const deleteBrand = async (args, { req, redis }) => {
  try {
    if (admin(req)) {
      const { name } = args;

      await Brand.deleteOne({ name: name });

      return { msg: 'success' };
    }
  } catch (err) {
    throw err;
  }
};

export {
  getBrands,
  createBrand,
  updateBrand,
  deleteBrand,
};
