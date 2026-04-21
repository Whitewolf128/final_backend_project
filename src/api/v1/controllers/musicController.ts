// Imports from other files
import { Request, Response, NextFunction } from "express";
import { createMusic, getAllMusic} from "../services/musicServices";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { Music } from "../models/musicModel";
import * as musicService from "../services/musicServices";
import { auth } from "../../../config/firebaseConfig";
import { successResponse } from "../models/responseModel";

// a controller that handles the get all music
export const getAllMusicsController = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    // outputs the message, count of items, and the data of the items
    try {
        const musics: Music[] = await getAllMusic();
        res.status(200).json(
        {
            "message": "musics Retrieved",
            count: musics.length,
            data: musics
        })
        // if there is an error, it will be displayed.
    } catch (error: unknown) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Failed to get musics"
        })
    }
};
// a controller that handles the creation of items
export const createMusicsController = async (req: Request,
    res: Response, next: NextFunction): Promise<void> =>
{
    // what each item should.
    try
    {
        const {
            nameOfArtist,
            album,
            releaseDate,
            songsReleased,
            popularSong,
            funFact,
            toured,
            yearsToured,
            createdAt,
            updatedAt
        } = req.body;
        // creates a music object with the required properties
        const music: Music =
        {
            nameOfArtist,
            album,
            releaseDate,
            songsReleased,
            popularSong,
            funFact,
            toured,
            yearsToured,
            createdAt,
            updatedAt
        };
        // calls the service function to create a new music entry
        const musics: Music = await createMusic(music);
        // outputs a success message and the created music data
        res.status(HTTP_STATUS.CREATED).json
        ({  message: "Music created",
            data: musics
        });
    }

    // if there is an error, it will be displayed.
    catch (error: unknown)
    {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Failed to create music"
        });
    }
};
// a controller that handles the update of items
export const updateMusicController = (req: Request, res: Response): void => {
    try{
        const { id } = req.params;
    const updatedMusic: string = req.body;
    musicService.updateMusic(Array.isArray(id) ? id[0] : id, updatedMusic);
    res.status(HTTP_STATUS.OK).json({ message: "Music updated", data: updateMusicController });
    }
    // if there is an error, it will be displayed.
    catch(error:unknown){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Failed to update music"
        });
    }
    
};

// a controller that handles the deletion of items
export const deleteMusicController = (req: Request, res: Response): void => {
    try{
        const { id } = req.params;
        // calls the service function to delete a music entry by its ID
    musicService.deleteMusic(Array.isArray(id) ? id[0] : id);
    res.status(HTTP_STATUS.OK).json({ message: "Music deleted" });
    // if there is an error, it will be displayed.
    } catch (error: unknown) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Failed to Delete music",
        });
    }
    
};
// a controller that handles the setting of custom claims for a user
export const setCustomClaims = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    console.log("uid, claims", req.body);
    const { uid, role } = req.body;
    try {
        // Set custom claims on the user's Firebase account
        await auth.setCustomUserClaims(uid, {role});

        res.status(HTTP_STATUS.OK).json(
            successResponse(
                {},
                `Custom claims set for user: ${uid}. User must obtain a new token for changes to take effect.`
            )
        );
        // if there is an error, it will be passed to the next middleware (error handler)
    } catch (error) {
        next(error);
    }
};