import express, { Express } from "express";
import morgan from "morgan";
import musicRouter from "./api/v1/routes/musicRoutes";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import setupSwagger from "../src/config/swagger";
import uploadRoute from '../src/api/v1/routes/uploadRouter';
import errorHandler from "./api/v1/middleware/errorHandler";

const app: Express = express();
dotenv.config();
app.use(express.json()); //  use JSON body parsing

// Use Morgan for HTTP request logging
app.use(morgan("combined"));
const publicCorsOptions = {
    origin: "*", // Allow all origins for public endpoints
    methods: ["GET"],
};

const authenticatedCorsOptions = {
    origin: process.env.ALLOWED_ORIGINS?.split(",") || [],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
};
// Apply basic Helmet security
app.use(helmet());
app.use(cors());
// Setup Swagger
setupSwagger(app);
// GET request at the app root
app.get("/", (req, res) => {
    res.send("Hello, World!");
});
// Health check endpoint to verify that the server is running and healthy
app.get("/api/v1/health", (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});
// Route handler for items
app.use("/api/v1", musicRouter, cors(authenticatedCorsOptions));
app.use("/api-docs", cors(publicCorsOptions));
app.use('/api/upload', uploadRoute);
app.use(errorHandler);
// Export the app
export default app;