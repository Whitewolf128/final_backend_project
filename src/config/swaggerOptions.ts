// @ts-ignore: no type definitions available for swagger-jsdoc
import swaggerJsdoc from "swagger-jsdoc"

// Swagger configuration options for generating API documentation
const swaggerOptions: swaggerJsdoc.Options = {
    definition: {
        // Specify the OpenAPI version and basic information about the API
        openapi: "3.0.0",
        info: {
            // Title, version, and description of the API for documentation purposes
            title: "Task Management API Documentation",
            version: "1.0.0",
            description:
            // A brief description of the API, which will be displayed in the generated documentation
                "This is the API documentation for the Task Management application.",
        },
        // Define the server URL and description for the API documentation
        servers: [
            {
                // The URL where the API is hosted, which will be used in the generated documentation to indicate where the API can be accessed
                url: "http://localhost:3000/api/v1",
                description: "Local server",
            },
        ],
        // Define security schemes for the API, specifying that it uses HTTP Bearer authentication with JWT tokens
        components: {
            securitySchemes: {
                bearerAuth: {
                    // Specify the type of security scheme (HTTP Bearer)
                    type: "http",
                    // Specify the authentication scheme (Bearer) and the format of the token (JWT)
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        // Apply the defined security scheme globally to all API endpoints, indicating that they require authentication using the bearerAuth scheme
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
        // Specify the paths to the API route files and validation files where Swagger will look for JSDoc comments to generate the API documentation
    apis: ["./src/api/v1/routes/*.ts", "./src/api/v1/validations/*.ts"], // Path to the API docs and schemas
};

// Generate the Swagger spec
export const generateSwaggerSpec = (): object => {
    return swaggerJsdoc(swaggerOptions);
};