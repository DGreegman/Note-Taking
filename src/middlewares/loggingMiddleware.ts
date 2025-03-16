import { Request, Response, NextFunction } from 'express';
import winston from 'winston';
import { ILogInfo } from '../types';

// Configure Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  
  // Store original end method
  const originalEnd = res.end;
  
  // Override end method
  res.end = function(chunk?: any, encoding?: any, callback?: any) {
    const responseTime = Date.now() - start;
    
    const logInfo: ILogInfo = {
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      responseTime,
      userId: (req as any).user?._id
    };
    
    logger.info(`${logInfo.method} ${logInfo.path} ${logInfo.statusCode} ${logInfo.responseTime}ms`);
    
    // Call original end method
    return originalEnd.call(this, chunk, encoding, callback);
  };
  
  next();
}
