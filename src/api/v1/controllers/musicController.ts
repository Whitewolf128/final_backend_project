import { Request, Response, NextFunction } from "express";
import { createMusic, getAllMusic} from "../services/musicServices";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { Music } from "../models/musicModel";
import * as musicService from "../services/musicServices";
import { auth } from "../../../config/firebaseConfig";
import { successResponse } from "../models/responseModel";

export const getAllMusicsController = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const musics: Music[] = await getAllMusic();
        res.status(200).json(
        {
            "message": "musics Retrieved",
            count: musics.length,
            data: musics
        })
    } catch (error: unknown) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Failed to get musics"
        })
    }
};
export const createMusicsController = async (req: Request,
    res: Response, next: NextFunction): Promise<void> =>
{
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
            monthsToured,
            createdAt,
            updatedAt
        } = req.body;
 
        const music: Music =
        {
            nameOfArtist,
            album,
            releaseDate,
            songsReleased,
            popularSong,
            funFact,
            toured,
            monthsToured,
            createdAt,
            updatedAt
        };
 
        const musics: Music = await createMusic(music);
 
        res.status(HTTP_STATUS.CREATED).json
        ({  message: "Music created",
            data: musics
        });
    }
    catch (error: unknown)
    {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Failed to create music"
        });
    }
};

export const updateMusicController = (req: Request, res: Response): void => {
    try{
        const { id } = req.params;
    const updatedMusic: string = req.body;
    musicService.updateMusic(Array.isArray(id) ? id[0] : id, updatedMusic);
    res.status(HTTP_STATUS.OK).json({ message: "Music updated", data: updateMusicController });
    }
    catch(error:unknown){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Failed to update music"
        });
    }
    
};

export const deleteMusicController = (req: Request, res: Response): void => {
    try{
        const { id } = req.params;
    musicService.deleteMusic(Array.isArray(id) ? id[0] : id);
    res.status(HTTP_STATUS.OK).json({ message: "Music deleted" });
    } catch (error: unknown) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Failed to Delete music",
        });
    }
    
};
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
    } catch (error) {
        next(error);
    }
};