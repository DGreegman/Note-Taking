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
exports.deleteNote = exports.updateNote = exports.createNote = exports.getNotesByCategory = exports.getNoteById = exports.getNotes = void 0;
const noteService_1 = __importDefault(require("../services/noteService"));
const getNotes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notes = yield noteService_1.default.getAllNotes();
        res.status(200).json(notes);
    }
    catch (error) {
        next(error);
    }
});
exports.getNotes = getNotes;
const getNoteById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const note = yield noteService_1.default.getNoteById(req.params.id);
        res.status(200).json(note);
    }
    catch (error) {
        next(error);
    }
});
exports.getNoteById = getNoteById;
const getNotesByCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notes = yield noteService_1.default.getNotesByCategory(req.params.categoryId);
        res.status(200).json(notes);
    }
    catch (error) {
        next(error);
    }
});
exports.getNotesByCategory = getNotesByCategory;
const createNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const note = yield noteService_1.default.createNote(req.body);
        res.status(201).json(note);
    }
    catch (error) {
        next(error);
    }
});
exports.createNote = createNote;
const updateNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const note = yield noteService_1.default.updateNote(req.params.id, req.body);
        res.status(200).json(note);
    }
    catch (error) {
        next(error);
    }
});
exports.updateNote = updateNote;
const deleteNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield noteService_1.default.deleteNote(req.params.id);
        res.status(200).json({ message: 'Note deleted successfully' });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteNote = deleteNote;
