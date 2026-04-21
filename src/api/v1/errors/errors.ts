// defines imports
import { HTTP_STATUS } from "../../../constants/httpConstants";

/**
 * Base error class for application errors.
 * Extends the built-in Error class to include an error code and status code.
 *
 * This abstract class provides:
 * - Consistent error structure across the application
 * - HTTP status codes for proper REST API responses
 * - Error codes for programmatic error handling
 * - Proper prototype chain setup for instanceof checks
 */
// export a base error class that extends the built-in Error class
export class AppError extends Error {
    /**
     * Creates a new AppError instance.
     * @param {string} message - The error message.
     * @param {string} code - The error code.
     * @param {number} statusCode - The http response code.
     */
    // constructor to initialize the error with message, code, and status code
    constructor(
        public message: string,
        public code: string,
        public statusCode: number
    ) {
        // call the parent constructor with the error message
        super(message);
        this.name = this.constructor.name;
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Class representing a repository error.
 * Extends AppError to include database and data access specific errors.
 * Used for Firestore operations, connection issues, and data integrity problems.
 */
// export a class to represent repository errors that extends the base AppError class
export class RepositoryError extends AppError {
    constructor(
        // initializes the repository error with a message, code, and status code
        message: string,
        code: string,
        statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR
    ) {
        // call the parent constructor to set the error properties
        super(message, code, statusCode);
    }
}

/**
 * Class representing a service error.
 * Extends AppError to include business logic specific errors.
 * Used for validation failures, business rule violations, and processing errors.
 */
// export a class to represent service errors that extends the base AppError class
export class ServiceError extends AppError {
    constructor(
        message: string,
        code: string = "SERVICE_ERROR",
        statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR
    ) {
        // call the parent constructor to set the error properties
        super(message, code, statusCode);
    }
}

/**
 * Class representing an authentication error.
 * Extends AppError to include token verification and user identity errors.
 * Used for invalid tokens, expired tokens, and missing authentication.
 */
// export a class to represent authentication errors that extends the base AppError class
export class AuthenticationError extends AppError {
    constructor(
        message: string,
        code: string = "AUTHENTICATION_ERROR",
        statusCode: number = HTTP_STATUS.UNAUTHORIZED
    ) {
        // call the parent constructor to set the error properties
        super(message, code, statusCode);
    }
}

/**
 * Class representing an authorization error.
 * Extends AppError to include role-based access control errors.
 * Used for insufficient permissions and role validation failures.
 */
// export a class to represent authorization errors that extends the base AppError class
export class AuthorizationError extends AppError {
    constructor(
        message: string,
        code: string = "AUTHORIZATION_ERROR",
        statusCode: number = HTTP_STATUS.FORBIDDEN
    ) {
        // call the parent constructor to set the error properties
        super(message, code, statusCode);
    }
}