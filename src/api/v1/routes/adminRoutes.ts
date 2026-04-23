//import necessary modules and middleware for the admin routes
import express from "express";
import { setCustomClaims } from "../controllers/adminController";
import authenticate from "../middleware/authenticate";
import cors from "cors";

// create a new router instance for admin routes
const adminRouter: express.Router = express.Router();
// Define CORS options for authenticated routes, allowing only specified origins and credentials
const authenticatedCorsOptions = {
    origin: process.env.ALLOWED_ORIGINS?.split(",") || [],
    credentials: true,
    methods: ["POST"],
};

// Only admins can set custom claims
adminRouter.post(
    "/setCustomClaims", cors(authenticatedCorsOptions),
    authenticate,
    //isAuthorized({ hasRole: ["admin"] }),

    setCustomClaims
);
// export the admin router to be used in the main application
export default adminRouter;