// External library imports
import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
// Internal module imports
import { MiddlewareFunction } from "../types/expressTypes";
import { HTTP_STATUS } from "../../../constants/httpConstants";

// Define interfaces for request schemas and validation options
interface RequestSchemas {
    body?: ObjectSchema;
    params?: ObjectSchema;
    query?: ObjectSchema;
}

// Define options for validation middleware
interface ValidationOptions {
    stripBody?: boolean;
    stripQuery?: boolean;
    stripParams?: boolean;
}

// Middleware function to validate request body, params, and query using Joi schemas
export const validateRequest = (
    schemas: RequestSchemas,
    options: ValidationOptions = {}
): MiddlewareFunction => {
    // stripParams - Usually don't strip params as they're route-defined
    const defaultOptions = {
        stripBody: true,
        stripQuery: true,
        stripParams: false,
        ...options,
    };

    // Return the middleware function that will perform validation
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors: string[] = [];

            const validatePart = (
                schema: ObjectSchema,
                data: any,
                partName: string,
                shouldStrip: boolean
            ) => {
                const { error, value } = schema.validate(data, {
                    abortEarly: false,
                    stripUnknown: shouldStrip,
                });
                // If there are validation errors, collect them with the part name for better error messages
                if (error) {
                    errors.push(
                        ...error.details.map(
                            (detail) => `${partName}: ${detail.message}`
                        )
                    );
                    // If there are errors, we return the original data to avoid stripping valid fields when validation fails
                } else if (shouldStrip) {
                    return value;
                }
                return data;
            };

            // Validate each request part if schema is provided
            if (schemas.body) {
                const value = validatePart(
                    schemas.body,
                    req.body,
                    "Body",
                    defaultOptions.stripBody
                );
                Object.assign(req.body, value);
            }

            // Validate params and query similarly, but usually we don't strip params as they are defined by the route
            if (schemas.params) {
                const value = validatePart(
                    schemas.params,
                    req.params,
                    "Params",
                    defaultOptions.stripParams
                );
                Object.assign(req.params, value);
            }
            // For query parameters, we can strip unknown fields by default to prevent unexpected query parameters from being processed
            if (schemas.query) {
                const value = validatePart(
                    schemas.query,
                    req.query,
                    "Query",
                    defaultOptions.stripQuery
                );
                Object.assign(req.query, value);
            }

            // If there are any validation errors, return them
            if (errors.length > 0) {
                return res.status(HTTP_STATUS.BAD_REQUEST).json({
                    error: `Validation error: ${errors.join(", ")}`,
                });
            }

            next();
        } 
        // If an unexpected error occurs during validation, catch it and return a generic error response
        catch (error: unknown) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                error: (error as Error).message,
            });
        }
    };
};