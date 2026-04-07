import Course from '../models/Course.js';
import asyncWrapper from '../utils/asyncWrapper.js';
import jsend from '../utils/jsend.js';
import AppError from '../utils/appError.js';

const createCourse = asyncWrapper(async (req, res, next) => {
    const { title, description, price, category } = req.body;
    const userId = req.user._id;
    const newCourse = new Course({ title, description, price, category, instructor: userId });
    await newCourse.save();
    return res.status(201).json(jsend.success({ newCourse }));
})

const getCourses = asyncWrapper(async (req, res, next) => {
    const courses = await Course.find().populate("category", "name description").populate("instructor", "userName email").lean();
    return res.status(200).json(jsend.success({ courses }));
})

const getCourse = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const course = await Course.findById(id).populate("category", "name description").populate("instructor", "userName email").lean();
    if (!course)
        return next(new AppError("Course not found", 404));

    return res.status(200).json(jsend.success({ course }));

})

const updateCourse = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const { title, description, price, category } = req.body;
    const course = await Course.findById(id);
    // Check if it exists
    if (!course) {
        return next(new AppError("Course not found", 404));
    }
    //  OWNERSHIP CHECK
    if (course.instructor.toString() !== req.user._id.toString()) {
        return next(new AppError("You do not have permission to modify this course", 403));
    }

    const updatedCourse = await Course.findByIdAndUpdate(
        id,
        { title, description, price, category },
        { new: true, runValidators: true }
    ).lean();

    return res.status(200).json(jsend.success({ updatedCourse }));

})

const deleteCourse = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const course = await Course.findById(id);

    // Check if it exists
    if (!course) {
        return next(new AppError("Course not found", 404));
    }

    //  OWNERSHIP CHECK
    if (course.instructor.toString() !== req.user._id.toString()) {
        return next(new AppError("You do not have permission to modify this course", 403));
    }

    await Course.findByIdAndDelete(req.params.id);

    return res.status(200).json(jsend.success(null));
});

export {
    createCourse,
    getCourses,
    getCourse,
    updateCourse,
    deleteCourse
}