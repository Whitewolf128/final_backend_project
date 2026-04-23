// Import necessary modules and middleware for the music routes
import express, { Router } from "express";
import {createMusicsController, createPostController, getAllMusicsController, updateMusicController, deleteMusicController} from "../controllers/musicController"
import { validateRequest } from "../middleware/validate";
import { postSchemas} from "../validation/musicValidation";
import cors from "cors";
import authenticate from "../middleware/authenticate";
import { setCustomClaims } from "../controllers/musicController";
import isAuthorized from "../middleware/authorize";
const musicRouter: Router = express.Router();

//  Define CORS options for authenticated routes, allowing only specified origins and credentials
const authenticatedCorsOptions = {
    origin: process.env.ALLOWED_ORIGINS?.split(",") || [],
    credentials: true,
    methods: ["POST"],
};

// Only admins can set custom claims
musicRouter.post(
    "/setCustomClaims", cors(authenticatedCorsOptions),
    authenticate,
    isAuthorized({ hasRole: ["admin"] }),
    setCustomClaims
);
// API doc 1: GET event endpoint with request parameters
/**
 * @openapi
 * /Music/:id:
 *   get:
 *     summary: Retrieve a event by ID (Admin only)
 *     tags: [Music]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the event to retrieve
 *     responses:
 *       '200':
 *         description: Successfully retrieved event details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 event:
 *                   $ref: '#/components/schemas/event'
 *       '401':
 *         description: Unauthorized - Missing or invalid token
 *       '403':
 *         description: Forbidden - Admin access required
 *       '404':
 *         description: event not found
 */
musicRouter.get("/music", getAllMusicsController);
// API doc 2: Post event endpoint with request parameters
/**
 * @openapi
 * /Music/:id:
 *   post:
 *     summary: Retrieve a event by ID (Admin only)
 *     tags: [Music]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the event to retrieve
 *     responses:
 *       '200':
 *         description: Successfully retrieved event details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 event:
 *                   $ref: '#/components/schemas/event'
 *       '401':
 *         description: Unauthorized - Missing or invalid token
 *       '403':
 *         description: Forbidden - Admin access required
 *       '404':
 *         description: event not found
 */

musicRouter.post("/music", validateRequest(postSchemas.create), createMusicsController);

musicRouter.post(
    "/posts",
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"] }),
    createPostController
);
// API doc 1: GET event endpoint with request parameters
/**
 * @openapi
 * /Music/:id:
 *   update:
 *     summary: Retrieve a event by ID (Admin only)
 *     tags: [Music]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the event to retrieve
 *     responses:
 *       '200':
 *         description: Successfully retrieved event details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 event:
 *                   $ref: '#/components/schemas/event'
 *       '401':
 *         description: Unauthorized - Missing or invalid token
 *       '403':
 *         description: Forbidden - Admin access required
 *       '404':
 *         description: event not found
 */
musicRouter.put("/music/:id", updateMusicController);
// API doc 1: GET event endpoint with request parameters
/**
 * @openapi
 * /Music/:id:
 *   delete:
 *     summary: Retrieve a event by ID (Admin only)
 *     tags: [Music]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the event to retrieve
 *     responses:
 *       '200':
 *         description: Successfully retrieved event details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 event:
 *                   $ref: '#/components/schemas/event'
 *       '401':
 *         description: Unauthorized - Missing or invalid token
 *       '403':
 *         description: Forbidden - Admin access required
 *       '404':
 *         description: event not found
 */
musicRouter.delete("/music/:id", deleteMusicController);

// export the music router to be used in the main application
export default musicRouter;