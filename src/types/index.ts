import { Request } from 'express';

// Note related types
export interface INoteBase {
  title: string;
  content: string;
  categoryId?: string;
}

export interface INoteDocument extends INoteBase {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateNoteRequest extends Request {
  body: INoteBase;
}

export interface IUpdateNoteRequest extends Request {
  body: Partial<INoteBase>;
}

// Category related types
export interface ICategoryBase {
  name: string;
  description?: string;
  color?: string;
}

export interface ICategoryDocument extends ICategoryBase {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateCategoryRequest extends Request {
  body: ICategoryBase;
}

export interface IUpdateCategoryRequest extends Request {
  body: Partial<ICategoryBase>;
}


// Logger related types
export interface ILogInfo {
    method: string;
    path: string;
    statusCode: number;
    responseTime: number;
    userId?: string;
}