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
exports.deleteNote = exports.updateNote = exports.createNote = exports.getNoteById = exports.getNotes = void 0;
const noteModel_1 = __importDefault(require("../models/noteModel"));
const errorTypes_1 = require("../utils/errorTypes");
// Get all notes
const getNotes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notes = yield noteModel_1.default.find().sort({ createdAt: -1 });
        res.status(200).json(notes);
    }
    catch (error) {
        next(error);
    }
});
exports.getNotes = getNotes;
// Get a specific note by ID
const getNoteById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const note = yield noteModel_1.default.findById(req.params.id);
        if (!note) {
            return next(new errorTypes_1.NotFoundError(`Note with id ${req.params.id} not found`));
        }
        res.status(200).json(note);
    }
    catch (error) {
        next(error);
    }
});
exports.getNoteById = getNoteById;
// Create a new note
const createNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return next(new errorTypes_1.BadRequestError('Title and content are required'));
        }
        const note = yield noteModel_1.default.create({
            title,
            content,
        });
        res.status(201).json(note);
    }
    catch (error) {
        next(error);
    }
});
exports.createNote = createNote;
// Update a note
const updateNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content } = req.body;
        const note = yield noteModel_1.default.findById(req.params.id);
        if (!note) {
            return next(new errorTypes_1.NotFoundError(`Note with id ${req.params.id} not found`));
        }
        note.title = title || note.title;
        note.content = content || note.content;
        const updatedNote = yield note.save();
        res.status(200).json(updatedNote);
    }
    catch (error) {
        next(error);
    }
});
exports.updateNote = updateNote;
// Delete a note
const deleteNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const note = yield noteModel_1.default.findById(req.params.id);
        if (!note) {
            return next(new errorTypes_1.NotFoundError(`Note with id ${req.params.id} not found`));
        }
        yield note.deleteOne();
        res.status(200).json({ message: 'Note deleted successfully' });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteNote = deleteNote;
