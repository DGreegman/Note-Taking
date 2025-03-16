import mongoose, { Schema, Document } from 'mongoose';
import { INoteBase } from '../types';

export interface INoteModel extends INoteBase, Document {
  createdAt: Date;
  updatedAt: Date;
}

const noteSchema = new Schema<INoteModel>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
      trim: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      default: null
    }
  },
  {
    timestamps: true,
  }
);

// Index to improve query performance for finding notes by category
noteSchema.index({ categoryId: 1 });

export default mongoose.model<INoteModel>('Note', noteSchema);