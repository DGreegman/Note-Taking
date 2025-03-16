import express from 'express';
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} from '../controllers/categoryController';
import { validate, categorySchema, categoryUpdateSchema } from '../middlewares/validationMiddleware';

const router = express.Router();

router.route('/')
  .get(getAllCategories)
  .post(validate(categorySchema), createCategory);

router.route('/:id')
  .get(getCategoryById)
  .put(validate(categoryUpdateSchema), updateCategory)
  .delete(deleteCategory);

export default router;