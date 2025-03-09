import { Request, Response, NextFunction } from 'express';
import Note, { INote } from '../models/noteModel';
import { NotFoundError, BadRequestError } from '../utils/errorTypes';

// Get all notes
export const getNotes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

// Get a specific note by ID
export const getNoteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const note = await Note.findById(req.params.id);
    
    if (!note) {
      return next(new NotFoundError(`Note with id ${req.params.id} not found`));
    }
    
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

// Create a new note
export const createNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, content } = req.body;
    
    if (!title || !content) {
      return next(new BadRequestError('Title and content are required'));
    }
    
    const note = await Note.create({
      title,
      content,
    });
    
    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
};

// Update a note
export const updateNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, content } = req.body;
    
    const note = await Note.findById(req.params.id);
    
    if (!note) {
      return next(new NotFoundError(`Note with id ${req.params.id} not found`));
    }
    
    note.title = title || note.title;
    note.content = content || note.content;
    
    const updatedNote = await note.save();
    
    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

// Delete a note
export const deleteNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const note = await Note.findById(req.params.id);
    
    if (!note) {
      return next(new NotFoundError(`Note with id ${req.params.id} not found`));
    }
    
    await note.deleteOne();
    
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    next(error);
  }
};
