import { Music } from "../models/musicModel";
import * as firestoreRepository from "../repositories/firestoreRepository";
/**
 * Updates an existing post.
 * @param {Post} postData - The updated post data.
 * @returns {Promise<void>}
 * @throws {Error} - If validation or repository operation fails.
 */

// Define the Firestore collection name for music documents
const COLLECTION = "music";

// Service function to retrieve all music documents from Firestore
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
    // Catch any errors that occur during the retrieval process and throw a new error with a descriptive message
    catch (error:unknown){
        const errorMessage = error instanceof Error ? error.message: "Unknown error";
        throw new Error(`Failed to retrieve all music: ${errorMessage}`);
    }
}
// Service function to create a new music document in Firestore
export const createMusic = async( musicData: {
    nameOfArtist: string;
    album: string;
    releaseDate: Date;
    songsReleased: number;
    popularSong: string;
    funFact: string;
    toured: boolean;
    monthsToured: string;
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
            monthsToured: musicData.monthsToured,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        const id = await firestoreRepository.createDocument<Music>(COLLECTION, newMusic);
        return{id, ...newMusic} as Music;

    }
// Catch any errors that occur during the creation process and throw a new error with a descriptive message
    catch(error: unknown){
        const errorMessage = error instanceof Error ? error.message: "Unknown error";
        throw new Error(`Failed to create music: ${errorMessage}`);
    }
};
// Service function to update an existing music document in Firestore
export const updateMusic = (id: string, music: string): string => {
    // Logic to update an item in the database
    return "Music has been updated";
};
// Service function to delete an existing music document from Firestore
export const deleteMusic = (id: string): string => {
    // Logic to delete an item from the database
    return "Music has been deleted";
};
// Service function to retrieve a music document by its ID from Firestore
export const createPost = async (postData: { Id: string; content: string }): Promise<{ id: string; Id: string; content: string; createdAt: Date; updatedAt: Date }> => {
    const now = new Date();
    const newPost = {
        Id: postData.Id,
        content: postData.content,
        createdAt: now,
        updatedAt: now,
    };
    const id = await firestoreRepository.createDocument("posts", newPost);
    return { id, ...newPost };
};
// ... other service functions (getPostById, updatePost, deletePost) ...