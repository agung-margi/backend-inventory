const Product = require('../models/productModel');
const Category = require('../models/categoryModel');
const db = require('../config/database');

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    products.length === 0
      ? res.status(404).json({
        isSuccess: false,
        message: 'Product not found',
        data: null
      })
      : res.status(200).json({
        isSuccess: true,
        message: 'Product retrieved successfully',
        data: products
      })
  } catch (err) {
    next(err);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, categoryId, stock } = req.body;
    const category = await Category.findOne({ where: { id: categoryId } });
    if (!category) {
      return res.status(404).json({
        isSuccess: false,
        message: 'Category not found',
        data: null
      });
    }


    const product = await Product.create({ name, description, price, categoryId, stock });
    res.status(201).json({
      isSuccess: true,
      message: 'Product created successfully',
      data: product
    });
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const updates = Object.keys(req.body);

  try {
    const product = await Product.findOne({ where: { id } });
    if (!product) {
      return res.status(404).json({
        isSuccess: false,
        message: 'Product not found',
        data: null
      });
    }

    const { categoryId } = req.body;
    const category = await Category.findOne({ where: { id: categoryId } });
    if (!category) {
      return res.status(404).json({
        isSuccess: false,
        message: 'Category not found',
        data: null
      });
    }

    updates.forEach(update => {
      product[update] = req.body[update];
    });
    await product.save();

    res.status(200).json({
      isSuccess: true,
      message: 'Product updated successfully',
      data: product
    });
  } catch (err) {
    next(err);
  };
}


const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ where: { id } });
    if (!product) {
      return res.status(404).json({
        isSuccess: false,
        message: 'Product not found',
        data: null
      });
    }
    await Product.destroy({ where: { id } });
    res.status(200).json({
      isSuccess: true,
      message: 'Product deleted successfully',
      data: null
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProducts, createProduct, updateProduct, deleteProduct
}