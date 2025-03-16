import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { BadRequestError } from '../utils/errorTypes';

export function validate<T>(schema: Joi.ObjectSchema<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    
    if (error) {
      const errorMessage = error.details
        .map(detail => detail.message)
        .join(', ');
      return next(new BadRequestError(errorMessage));
    }
    
    next();
  };
}

// Validation schemas
export const noteSchema = Joi.object({
  title: Joi.string().max(100).required(),
  content: Joi.string().required(),
  categoryId: Joi.string().allow(null, '').optional()
});

export const noteUpdateSchema = Joi.object({
  title: Joi.string().max(100).optional(),
  content: Joi.string().optional(),
  categoryId: Joi.string().allow(null, '').optional()
});

export const categorySchema = Joi.object({
  name: Joi.string().max(50).required(),
  description: Joi.string().max(200).optional(),
  color: Joi.string().pattern(/^#([0-9a-f]{3}){1,2}$/i).optional()
});

export const categoryUpdateSchema = Joi.object({
  name: Joi.string().max(50).optional(),
  description: Joi.string().max(200).optional(),
  color: Joi.string().pattern(/^#([0-9a-f]{3}){1,2}$/i).optional()
});