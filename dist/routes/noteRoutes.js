"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const noteController_1 = require("../controllers/noteController");
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
const router = express_1.default.Router();
router.route('/')
    .get(noteController_1.getNotes)
    .post((0, validationMiddleware_1.validate)(validationMiddleware_1.noteSchema), noteController_1.createNote);
router.route('/:id')
    .get(noteController_1.getNoteById)
    .put((0, validationMiddleware_1.validate)(validationMiddleware_1.noteUpdateSchema), noteController_1.updateNote)
    .delete(noteController_1.deleteNote);
router.route('/categories/:categoryId')
    .get(noteController_1.getNotesByCategory);
exports.default = router;
