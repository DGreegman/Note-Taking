import Note, { INoteModel } from '../models/noteModel';
import { INoteBase } from '../types';
import { NotFoundError } from '../utils/errorTypes';

export class NoteService {
  async getAllNotes(): Promise<INoteModel[]> {
    return await Note.find().sort({ createdAt: -1 }).populate('categoryId');
  }

  async getNoteById(id: string): Promise<INoteModel> {
    const note = await Note.findById(id).populate('categoryId');
    
    if (!note) {
      throw new NotFoundError(`Note with id ${id} not found`);
    }
    
    return note;
  }

  async getNotesByCategory(categoryId: string): Promise<INoteModel[]> {
    return await Note.find({ categoryId }).sort({ createdAt: -1 }).populate('categoryId');
  }

  async createNote(noteData: INoteBase): Promise<INoteModel> {
    return await Note.create(noteData);
  }

  async updateNote(id: string, noteData: Partial<INoteBase>): Promise<INoteModel> {
    const note = await Note.findByIdAndUpdate(
      id,
      noteData,
      { new: true, runValidators: true }
    ).populate('categoryId');
    
    if (!note) {
      throw new NotFoundError(`Note with id ${id} not found`);
    }

    return note;
  }

  async deleteNote(id: string): Promise<void> {
    const result = await Note.deleteOne({ _id: id });
    
    if (result.deletedCount === 0) {
      throw new NotFoundError(`Note with id ${id} not found`);
    }
  }
}

export default new NoteService();