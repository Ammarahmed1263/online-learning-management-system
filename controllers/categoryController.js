import Category from '../models/Category.js';
import asyncWrapper from '../utils/asyncWrapper.js';
import jsend from '../utils/jsend.js';
import AppError from '../utils/appError.js';

const createCategory = asyncWrapper(async (req, res, next) => {
    const { name, description } = req.body;

    const category = await Category.create({ name, description });

    return res.status(201).json(jsend.success({ category }));
});

const getCategories = asyncWrapper(async (req, res, next) => {
    const categories = await Category.find().lean();
    return res.status(200).json(jsend.success({ categories }));
});

const getCategory = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;

    const category = await Category.findById(id).lean();

    if (!category) {
        return next(new AppError("Category not found", 404));
    }

    return res.status(200).json(jsend.success({ category }));
});

const updateCategory = asyncWrapper(async (req, res, next) => {
    const { name, description } = req.body;
    const { id } = req.params;

    const updatedCategory = await Category.findByIdAndUpdate(
        id,
        { name, description },
        { new: true, runValidators: true }
    ).lean();

    // Check the correct variable
    if (!updatedCategory) {
        return next(new AppError("Category not found", 404));
    }

    return res.status(200).json(jsend.success({ category: updatedCategory }));
});

const deleteCategory = asyncWrapper(async (req, res, next) => {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);

    if (!deletedCategory) {
        return next(new AppError("Category not found", 404));
    }

    return res.status(200).json(jsend.success(null));
});

export {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
};
