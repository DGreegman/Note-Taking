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
exports.NoteService = void 0;
const noteModel_1 = __importDefault(require("../models/noteModel"));
const errorTypes_1 = require("../utils/errorTypes");
class NoteService {
    getAllNotes() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield noteModel_1.default.find().sort({ createdAt: -1 }).populate('categoryId');
        });
    }
    getNoteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const note = yield noteModel_1.default.findById(id).populate('categoryId');
            if (!note) {
                throw new errorTypes_1.NotFoundError(`Note with id ${id} not found`);
            }
            return note;
        });
    }
    getNotesByCategory(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield noteModel_1.default.find({ categoryId }).sort({ createdAt: -1 }).populate('categoryId');
        });
    }
    createNote(noteData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield noteModel_1.default.create(noteData);
        });
    }
    updateNote(id, noteData) {
        return __awaiter(this, void 0, void 0, function* () {
            const note = yield noteModel_1.default.findByIdAndUpdate(id, noteData, { new: true, runValidators: true }).populate('categoryId');
            if (!note) {
                throw new errorTypes_1.NotFoundError(`Note with id ${id} not found`);
            }
            return note;
        });
    }
    deleteNote(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield noteModel_1.default.deleteOne({ _id: id });
            if (result.deletedCount === 0) {
                throw new errorTypes_1.NotFoundError(`Note with id ${id} not found`);
            }
        });
    }
}
exports.NoteService = NoteService;
exports.default = new NoteService();
