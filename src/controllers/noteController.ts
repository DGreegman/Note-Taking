import { Request, Response, NextFunction } from 'express';
import noteService from '../services/noteService';
import { 
  ICreateNoteRequest, 
  IUpdateNoteRequest 
} from '../types';

export const getNotes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notes = await noteService.getAllNotes();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const getNoteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const note = await noteService.getNoteById(req.params.id);
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const getNotesByCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notes = await noteService.getNotesByCategory(req.params.categoryId);
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const createNote = async (req: ICreateNoteRequest, res: Response, next: NextFunction) => {
  try {
    const note = await noteService.createNote(req.body);
    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req: IUpdateNoteRequest, res: Response, next: NextFunction) => {
  try {
    const note = await noteService.updateNote(req.params.id, req.body);
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await noteService.deleteNote(req.params.id);
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    next(error);
  }
};