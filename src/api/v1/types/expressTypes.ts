// Import necessary types from the Express library
import { Request, Response, NextFunction } from "express";

// Define a type for middleware functions that will be used in the application
export type MiddlewareFunction = (
    req: Request,
    res: Response,
    next: NextFunction
) => void;