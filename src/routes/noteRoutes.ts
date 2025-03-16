import express from 'express';
import { 
  getNotes,
  getNoteById,
  getNotesByCategory,
  createNote,
  updateNote,
  deleteNote 
} from '../controllers/noteController';
import { validate, noteSchema, noteUpdateSchema } from '../middlewares/validationMiddleware';

const router = express.Router();

router.route('/')
  .get(getNotes)
  .post(validate(noteSchema), createNote);

router.route('/:id')
  .get(getNoteById)
  .put(validate(noteUpdateSchema), updateNote)
  .delete(deleteNote);

router.route('/categories/:categoryId')
  .get(getNotesByCategory);

export default router;