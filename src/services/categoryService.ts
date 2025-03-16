import Category, { ICategoryModel } from '../models/categoryModel';
import { ICategoryBase, ICategoryDocument } from '../types';
import { NotFoundError } from '../utils/errorTypes';

export class CategoryService {
  async getAllCategories(): Promise<ICategoryModel[]> {
    return await Category.find().sort({ name: 1 });
  }

  async getCategoryById(id: string): Promise<ICategoryModel> {
    const category = await Category.findById(id);
    if (!category) {
      throw new NotFoundError(`Category with id ${id} not found`);
    }
    return category;
  }

  async createCategory(categoryData: ICategoryBase): Promise<ICategoryModel> {
    return await Category.create(categoryData);
  }

  async updateCategory(id: string, categoryData: Partial<ICategoryBase>): Promise<ICategoryModel> {
    const category = await Category.findByIdAndUpdate(
      id,
      categoryData,
      { new: true, runValidators: true }
    );
    
    if (!category) {
      throw new NotFoundError(`Category with id ${id} not found`);
    }

    return category;
  }

  async deleteCategory(id: string): Promise<void> {
    const result = await Category.deleteOne({ _id: id });
    
    if (result.deletedCount === 0) {
      throw new NotFoundError(`Category with id ${id} not found`);
    }
  }
}

export default new CategoryService();