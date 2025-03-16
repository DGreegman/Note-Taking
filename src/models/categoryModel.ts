import mongoose, { Schema, Document } from 'mongoose';
import { ICategoryBase } from '../types';

export interface ICategoryModel extends ICategoryBase, Document {
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategoryModel>(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      trim: true,
      maxlength: [50, 'Category name cannot be more than 50 characters'],
      unique: true
    },
    description: {
      type: String,
      trim: true,
      maxlength: [200, 'Description cannot be more than 200 characters']
    },
    color: {
      type: String,
      default: '#000000',
      validate: {
        validator: function(v: string) {
          return /^#([0-9a-f]{3}){1,2}$/i.test(v);
        },
        message: props => `${props.value} is not a valid hex color!`
      }
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<ICategoryModel>('Category', categorySchema);