const Category = require("../models/categoryModel");

const getAllCategory = async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    categories.length === 0
      ? res.status(404).json({
        isSuccess: false,
        message: "Category not found",
        data: null,
      })
      : res.status(200).json({
        isSuccess: true,
        message: "Category retrieved successfully",
        data: categories,
      });
  } catch (error) {
    next(error);
  }
};

const createCategory = async (req, res, next) => {
  const { name } = req.body;
  try {
    const checkCategory = await Category.findOne({ where: { name } });
    if (checkCategory) {
      return res.status(409).json({
        isSuccess: false,
        message: "Category already exists",
        data: null,
      });
    }

    const category = await Category.create({ name });
    res.status(201).json({
      isSuccess: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const category = await Category.findOne({ where: { id } });
    if (!category) {
      return res.status(404).json({
        isSuccess: false,
        message: "Category not found",
        data: null,
      });
    }
    const updatedCategory = await category.update({ name });
    res.status(200).json({
      isSuccess: true,
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  const { id } = req.params;
  try {
    const category = await Category.findOne({ where: { id } });
    if (!category) {
      return res.status(404).json({
        isSuccess: false,
        message: "Category not found",
        data: null,
      });
    }
    await category.destroy();
    res.status(200).json({
      isSuccess: true,
      message: "Category deleted successfully",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCategory,
  createCategory,
  updateCategory,
  deleteCategory,
}