// External library imports
import { Request, Response, NextFunction } from "express";
import { DecodedIdToken } from "firebase-admin/auth";
import { AuthenticationError } from "../errors/errors";
import { getErrorMessage, getErrorCode } from "../utils/errorUtils";

// Internal module imports
import { auth } from "../../../config/firebaseConfig";

/**
 * Middleware to authenticate a user using a Firebase ID token.
 * Now integrated with centralized error handling system.
 *
 * This middleware:
 * - Extracts the token from the Authorization header
 * - Verifies the token with Firebase Auth
 * - Stores user information in res.locals for downstream middleware
 * - Throws standardized AuthenticationError for any failures
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
// export a middleware function to authenticate users using Firebase ID tokens
const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
    // returns a promise that resolves when authentication is complete or an error is thrown
): Promise<void> => {
    try {
        // Extract the token from the Authorization header
        const authHeader = req.headers.authorization;
        // Check if the header is in the format "Bearer <token>"
        const token: string | undefined = authHeader?.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : undefined;
        // If no token is found, throw an authentication error
        if (!token) {
            throw new AuthenticationError(
                "Unauthorized: No token provided",
                "TOKEN_NOT_FOUND"
            );
        }
        // Verify the token with Firebase Auth and extract user information
        const decodedToken: DecodedIdToken = await auth.verifyIdToken(
            token
        );
        res.locals.uid = decodedToken.uid;
        res.locals.role = decodedToken.role;
        next();
        // If token verification fails, an error will be thrown and caught in the catch block
    } catch (error: unknown) {
        if (error instanceof AuthenticationError) {
            // Re-throw authentication errors to be handled by error middleware
            next(error);
            // For other types of errors, wrap them in an AuthenticationError with standardized message and code
        } else if (error instanceof Error) {
            next(
                new AuthenticationError(
                    `Unauthorized: ${getErrorMessage(error)}`,
                    getErrorCode(error)
                )
            );
            // If the error is not an instance of Error, create a generic authentication error
        } else {
            next(
                new AuthenticationError(
                    "Unauthorized: Invalid token",
                    "TOKEN_INVALID"
                )
            );
        }
    }
};

export default authenticate;