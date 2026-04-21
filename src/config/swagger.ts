// @ts-ignore: no type definitions available for swagger-jsdoc
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { generateSwaggerSpec } from "../config/swaggerOptions";

// Function to set up Swagger UI middleware in the Express app
const setupSwagger = (app: Express): void => {
    const specs = generateSwaggerSpec();
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
// Export the setupSwagger function as the default export of this module
export default setupSwagger;