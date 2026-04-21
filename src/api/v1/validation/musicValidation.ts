// Import the Joi library for schema validation and the Joi date extension for date validation
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
 *         - nameOfArtist
 *         - album
 *         - songsReleased
 *         - releaseDate
 *         - popularSong
 *         - funFact
 *         - toured
 *         - yearsToured
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the user
 *           example: "f5gk9a3y4a8y5"
 *         nameOfArtist:
 *           type: string
 *           description: the name of the artist
 *           example: "Ozzy Osbourne"
 *         album:
 *           type: string
 *           description: the name of the album
 *           example: "Blizzard of Ozz"
 *         songsReleased:
 *           type: number
 *           description: Number of songs released
 *           example: 12
 *         releaseDate:
 *           type: date
 *           description: Release date of the album
 *           example: "1980-09-20"
 *         popularSong:
 *           type: string
 *           description: Most popular song from the album
 *           example: "Crazy Train"
 *         funFact:
 *           type: string
 *           description: Fun fact about the artist or album
 *           example: "The first album Ozzy released after being booted from Black Sabbath and the first album to feature guitarist Randy Rhoads."
 *         toured:
 *           type: boolean
 *           description: Whether the artist toured for this album
 *           example: true
 *         yearsToured:
 *           type: string
 *           description: How long the artist toured for this album
 *           example: "1.03"
 */

// Post operation schemas organized by request part
export const postSchemas = {
    // POST /posts - Create new post
    create: {
        body: Joi.object({
            nameOfArtist: Joi.string().required().min(5).max(80),
            album: Joi.string().required().min(10).max(80),
            songsReleased: Joi.number().required().integer().max(20).positive().precision(2),
            releaseDate: Joi.date().required().less('now'),
            popularSong:  Joi.string().required().min(2).max(50),
            funFact:  Joi.string().required().min(30).max(300),
            toured: Joi.boolean().required().valid(true,false),
            yearsToured: Joi.string().min(19).max(31),
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
            releaseDate: Joi.date().required().less('now'),
            popularSong:  Joi.string().required().min(2).max(50),
            funFact:  Joi.string().required().min(30).max(200),
            toured: Joi.boolean().required().valid(true,false),
            yearsToured: Joi.string().min(19).max(31)
    },
};