// Import necessary modules and dependencies for testing the isAuthorized middleware
import { Request, Response } from "express";
import isAuthorized from "../src/api/v1/middleware/authorize";
import { AuthorizationError } from "../src/api/v1/errors/errors";
import { jest, beforeEach, it, expect, describe } from '@jest/globals';
// Test suite for the isAuthorized middleware
describe("isAuthorized middleware", () => {
    let mockRequest: Partial<Request>;//THERE IS A SEMICOLON AT THE END >:(
    let mockResponse: Partial<Response>;
    let nextFunction: jest.Mock;

    beforeEach(() => {
    mockRequest = {
        params: {},
    };
    mockResponse = {
        locals: {},
    };
    nextFunction = jest.fn();
    });
    it("should call next() when user has required role", () => {
        // Arrange
        mockResponse.locals = {
            uid: "user123",
            role: "admin",
        };

        const middleware = isAuthorized({ hasRole: ["admin", "manager"] });

        // Act
        middleware(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        // Assert
        // Called without error
        expect(nextFunction).toHaveBeenCalledWith();
    });
// Test case for when user does not have required role and allowSameUser is false
    it("should pass AuthorizationError to next() when user has insufficient role", () => {
        // Arrange
        mockResponse.locals = {
            uid: "user123",
            role: "user",
        };

        const middleware = isAuthorized({ hasRole: ["admin"] });

        // Act
        middleware(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        // Assert
        expect(nextFunction).toHaveBeenCalledWith(
            expect.any(AuthorizationError)
        );
        const error = nextFunction.mock.calls[0][0] as AuthorizationError;
        expect(error.message).toBe("Forbidden: Insufficient role");
        expect(error.code).toBe("INSUFFICIENT_ROLE");
        expect(error.statusCode).toBe(403);
    });

    // Test case for when the same user is accessing their own resource and allowSameUser is true
    it("should call next() when same user and allowSameUser is true", () => {
        // Arrange
        mockRequest.params = { id: "user123" };
        // User doesn't have admin role
        mockResponse.locals = {
            uid: "user123",
            role: "user",
        };
// allowSameUser is enabled
        const middleware = isAuthorized({
            hasRole: ["admin"],
            allowSameUser: true,
        });

        // Act
        middleware(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        // Assert
        // Should succeed due to allowSameUser
        expect(nextFunction).toHaveBeenCalledWith();
    });
//  Test case for when role is missing in res.locals
    it("should pass AuthorizationError to next() when role is missing", () => {
        // Arrange
        mockResponse.locals = {
        uid: "user123",
        // No role property
        };

        const middleware = isAuthorized({ hasRole: ["admin"] });

        // Act
        middleware(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
        );

        // Assert
        expect(nextFunction).toHaveBeenCalledWith(
            expect.any(AuthorizationError)
        );
        const error = nextFunction.mock.calls[0][0] as AuthorizationError;
        expect(error.message).toBe("Forbidden: No role found");
        expect(error.code).toBe("ROLE_NOT_FOUND");
    });
// Test case for when the same user is accessing their own resource but allowSameUser is false
    it("should not allow same user when allowSameUser is false", () => {
        // Arrange
        mockRequest.params = { id: "user123" };
        mockResponse.locals = {
            uid: "user123",
            role: "user",
            };
            
        // Explicitly disabled
        const middleware = isAuthorized({
        hasRole: ["admin"],
        allowSameUser: false,
        });

        // Act
        middleware(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        // Assert
        expect(nextFunction).toHaveBeenCalledWith(
            expect.any(AuthorizationError)
        );

    });
});