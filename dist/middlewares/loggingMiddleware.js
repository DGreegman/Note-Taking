"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = requestLogger;
const winston_1 = __importDefault(require("winston"));
// Configure Winston logger
const logger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.json()),
    transports: [
        new winston_1.default.transports.Console({
            format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.simple())
        }),
        new winston_1.default.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston_1.default.transports.File({ filename: 'logs/combined.log' })
    ]
});
function requestLogger(req, res, next) {
    const start = Date.now();
    // Store original end method
    const originalEnd = res.end;
    // Override end method
    res.end = function (chunk, encoding, callback) {
        var _a;
        const responseTime = Date.now() - start;
        const logInfo = {
            method: req.method,
            path: req.path,
            statusCode: res.statusCode,
            responseTime,
            userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id
        };
        logger.info(`${logInfo.method} ${logInfo.path} ${logInfo.statusCode} ${logInfo.responseTime}ms`);
        // Call original end method
        return originalEnd.call(this, chunk, encoding, callback);
    };
    next();
}
