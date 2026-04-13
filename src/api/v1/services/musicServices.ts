import { Music } from "../models/musicModel";
import * as firestoreRepository from "../repositories/firestoreRepository";
/**
 * Updates an existing post.
 * @param {Post} postData - The updated post data.
 * @returns {Promise<void>}
 * @throws {Error} - If validation or repository operation fails.
 */

const COLLECTION = "music";

export const getAllMusic = async(): Promise<Music[]> => {
    try{
        const snapshot = await firestoreRepository.getDocuments(COLLECTION);
        const music: Music[] = snapshot.docs.map((doc) =>{
            const data = doc.data();
            return {
                id: doc.id,
                ...data
            } as Music;
        });
        return music; 
    }
    catch (error:unknown){
        const errorMessage = error instanceof Error ? error.message: "Unknown error";
        throw new Error(`Failed to retrieve all products: ${errorMessage}`);
    }
}

export const createMusic = async( musicData: {
    nameOfArtist: string;
    album: string;
    releaseDate: Date;
    songsReleased: number;
    popularSong: string;
    funFact: string;
    toured: boolean;
    yearsToured: string;
}): Promise<Music> =>{
    try{
        const newMusic: Music = {
            nameOfArtist:musicData.nameOfArtist,
            album: musicData.album,
            releaseDate:musicData.releaseDate,
            songsReleased:musicData.songsReleased,
            popularSong:musicData.popularSong,
            funFact: musicData.funFact,
            toured: musicData.toured,
            yearsToured: musicData.yearsToured,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        const id = await firestoreRepository.createDocument<Music>(COLLECTION, newMusic);
        return{id, ...newMusic} as Music;

    }

    catch(error: unknown){
        const errorMessage = error instanceof Error ? error.message: "Unknown error";
        throw new Error(`Failed to create music: ${errorMessage}`);
    }
};

export const updateMusic = (id: string, music: string): string => {
    // Logic to update an item in the database
    return "Music has been updated";
};

export const deleteMusic = (id: string): string => {
    // Logic to delete an item from the database
    return "Music has been deleted";
};

export function createPost(mockInput: { Id: string; content: string; }) {
    throw new Error('Function not implemented.');
}
// ... other service functions (getPostById, updatePost, deletePost) ...