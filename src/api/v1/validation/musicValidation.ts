
import Joi from "joi";
import "@joi/date";



// Your actual Joi validation schema
/**
 * @openapi
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - capacity
 *         - registrationCount
 *         - date
 * *       - status
 *         - category
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the user
 *           example: "f5gk9a3y4a8y5"
 *         name:
 *           type: string
 *           description: the events name
 *           example: "fluffy show"
 *         capacity:
 *           type: number
 *           description: How many people could go
 *           example: 100
 *         registrationCount:
 *           type: number
 *           description: How many people are going
 *           example: 95
 *         date:
 *           type: date
 *           description: when the event takes place
 *           example: "2026-03-06"
 *         status:
 *           type: string
 *           description: The current status of the event
 *           valid: "active", "cancelled", "completed"
 *           example: "completed"
 *         category:
 *           type: string
 *           description: the type of the event
 *           valid: "conference", "workshop", "meetup", "seminar", "general"
 *           example: "general"
 */

// Post operation schemas organized by request part
export const postSchemas = {
    // POST /posts - Create new post
    create: {
        body: Joi.object({
            nameOfArtist: Joi.string().required().min(5).max(80),
            album: Joi.string().required().min(10).max(80),
            songsReleased: Joi.number().required().integer().max(20).positive().precision(2),
            releaseDate: Joi.date().required().greater('now'),
            popularSong:  Joi.string().required().min(2).max(50),
            funFact:  Joi.string().required().min(30).max(200),
            yearsToured: Joi.string().min(4).max(9),
            content: Joi.string().required().messages({
                "any.required": "Content is required",
                "string.empty": "Content cannot be empty",
            }), 
        }),
    },
  

    // PUT /posts/:id - Update post
    update: {
            nameOfArtist: Joi.string().required().min(5).max(80),
            album: Joi.string().required().min(10).max(80),
            songsReleased: Joi.number().required().integer().max(20).positive().precision(2),
            releaseDate: Joi.date().required().greater('now'),
            popularSong:  Joi.string().required().min(2).max(50),
            funFact:  Joi.string().required().min(30).max(200),
            yearsToured: Joi.string().min(4).max(9)
    },
};