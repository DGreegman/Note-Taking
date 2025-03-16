"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryUpdateSchema = exports.categorySchema = exports.noteUpdateSchema = exports.noteSchema = void 0;
exports.validate = validate;
const joi_1 = __importDefault(require("joi"));
const errorTypes_1 = require("../utils/errorTypes");
function validate(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            const errorMessage = error.details
                .map(detail => detail.message)
                .join(', ');
            return next(new errorTypes_1.BadRequestError(errorMessage));
        }
        next();
    };
}
// Validation schemas
exports.noteSchema = joi_1.default.object({
    title: joi_1.default.string().max(100).required(),
    content: joi_1.default.string().required(),
    categoryId: joi_1.default.string().allow(null, '').optional()
});
exports.noteUpdateSchema = joi_1.default.object({
    title: joi_1.default.string().max(100).optional(),
    content: joi_1.default.string().optional(),
    categoryId: joi_1.default.string().allow(null, '').optional()
});
exports.categorySchema = joi_1.default.object({
    name: joi_1.default.string().max(50).required(),
    description: joi_1.default.string().max(200).optional(),
    color: joi_1.default.string().pattern(/^#([0-9a-f]{3}){1,2}$/i).optional()
});
exports.categoryUpdateSchema = joi_1.default.object({
    name: joi_1.default.string().max(50).optional(),
    description: joi_1.default.string().max(200).optional(),
    color: joi_1.default.string().pattern(/^#([0-9a-f]{3}){1,2}$/i).optional()
});
