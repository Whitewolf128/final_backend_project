import { Request, Response, NextFunction } from "express";
import authenticate from "../src/api/v1/middleware/authenticate";
import { auth } from "../src/config/firebaseConfig";
import { AuthenticationError } from "../src/api/v1/errors/errors";
import { HTTP_STATUS } from "../src/constants/httpConstants";
import { jest, beforeEach, afterEach, afterAll, it, expect, describe } from '@jest/globals';

// Mock Firebase auth
jest.mock("../src/config/firebaseConfig", () => ({
    auth: {
        verifyIdToken: jest.fn(),
    },
}));

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

    it("should pass AuthenticationError to next() when token verification fails", async () => {
         // Arrange
        mockRequest.headers = {
            authorization: "Bearer invalid-token",
        };

        (auth.verifyIdToken as jest.Mock).mockRejectedValueOnce(
            await Promise.reject(new Error("Invalid token"))
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

    it("should call next() and set user data when token is valid", async () => {
         // Arrange
        mockRequest.headers = {
            authorization: "Bearer valid-token",
        };

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