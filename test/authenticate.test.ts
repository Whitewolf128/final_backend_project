// Import necessary modules and dependencies for testing the authenticate middleware
import { Request, Response } from "express";
import authenticate from "../src/api/v1/middleware/authenticate";
import { auth } from "../src/config/firebaseConfig";
import { AuthenticationError } from "../src/api/v1/errors/errors";
import { HTTP_STATUS } from "../src/constants/httpConstants";
import { jest, beforeEach, it, expect, describe } from '@jest/globals';

// Mock Firebase auth
jest.mock("../src/config/firebaseConfig", () => ({
    auth: {
        verifyIdToken: jest.fn(),
    },
}));

// Test suite for the authenticate middleware
describe("authenticate middleware", () => {
    let mockRequest: Partial<Request>;//THERE IS A SEMICOLON AT THE END >:(
    let mockResponse: Partial<Response>;
    let nextFunction: jest.Mock;

    beforeEach(() => {
        mockRequest = {
            headers: {},
        };
        mockResponse = {
            locals: {},
        };
        nextFunction = jest.fn();
    });

// Test case for when no token is provided in the Authorization header
    it ("should pass AuthenticationError to next() when no token is provided", async () => {
        // Act
        await authenticate(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );
        
        // Assert
        expect(nextFunction).toHaveBeenCalledWith(
            expect.any(AuthenticationError)
        );
        const error = nextFunction.mock.calls[0][0] as AuthenticationError;
        expect(error.message).toBe("Unauthorized: No token provided");
        expect(error.code).toBe("TOKEN_NOT_FOUND");
        expect(error.statusCode).toBe(HTTP_STATUS.UNAUTHORIZED);
    });
// Test case for when token verification fails (e.g., invalid token)
    it("should pass AuthenticationError to next() when token verification fails", async () => {
         // Arrange
        mockRequest.headers = {
            authorization: "Bearer invalid-token",
        };

        (auth.verifyIdToken as jest.MockedFunction<typeof auth.verifyIdToken>).mockRejectedValueOnce(
            new Error("Invalid token")
        );
          // Act
        await authenticate(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );
        // Assert
        expect(nextFunction).toHaveBeenCalledWith(
            expect.any(AuthenticationError)
        );
    
    });
// Test case for when token verification succeeds and user data is set in res.locals
    it("should call next() and set user data when token is valid", async () => {
         // Arrange
        mockRequest.headers = {
            authorization: "Bearer valid-token",
        };
// Mock the verifyIdToken function to return a decoded token with uid and role
        const mockVerifyIdToken =
                auth.verifyIdToken as jest.MockedFunction<typeof auth.verifyIdToken>;

                mockVerifyIdToken.mockResolvedValueOnce({
                    uid: "test-uid",
                    role: "admin",
                } as unknown as Awaited<ReturnType<typeof auth.verifyIdToken>>);
        // Act
        await authenticate(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        // Assert
        expect(auth.verifyIdToken).toHaveBeenCalledWith("valid-token");
        expect(mockResponse.locals).toEqual({
            uid: "test-uid",
            role: "admin",
        });
        // Called without error
        expect(nextFunction).toHaveBeenCalledWith();
    });
// Test case for when the Authorization header is malformed (e.g., missing "Bearer " prefix)
    it("should handle malformed authorization header", async () => {
        // Arrange
        // Missing "Bearer " prefix
        mockRequest.headers = {
            authorization: "InvalidFormat",
        };

        // Act
        await authenticate(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

         // Assert
        expect(nextFunction).toHaveBeenCalledWith(
            expect.any(AuthenticationError)
        );
        const error = nextFunction.mock.calls[0][0] as AuthenticationError;
        expect(error.message).toBe("Unauthorized: No token provided");
    });
    
});