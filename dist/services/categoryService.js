"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const categoryModel_1 = __importDefault(require("../models/categoryModel"));
const errorTypes_1 = require("../utils/errorTypes");
class CategoryService {
    getAllCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield categoryModel_1.default.find().sort({ name: 1 });
        });
    }
    getCategoryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield categoryModel_1.default.findById(id);
            if (!category) {
                throw new errorTypes_1.NotFoundError(`Category with id ${id} not found`);
            }
            return category;
        });
    }
    createCategory(categoryData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield categoryModel_1.default.create(categoryData);
        });
    }
    updateCategory(id, categoryData) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield categoryModel_1.default.findByIdAndUpdate(id, categoryData, { new: true, runValidators: true });
            if (!category) {
                throw new errorTypes_1.NotFoundError(`Category with id ${id} not found`);
            }
            return category;
        });
    }
    deleteCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield categoryModel_1.default.deleteOne({ _id: id });
            if (result.deletedCount === 0) {
                throw new errorTypes_1.NotFoundError(`Category with id ${id} not found`);
            }
        });
    }
}
exports.CategoryService = CategoryService;
exports.default = new CategoryService();
