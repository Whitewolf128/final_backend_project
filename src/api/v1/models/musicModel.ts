// Define the Music interface representing the structure of a music record in the application
export interface Music {
    id?: string;
    nameOfArtist: string;
    album: string;
    releaseDate: Date;
    songsReleased: number;
    popularSong: string;
    funFact: string;
    toured: boolean;
    yearsToured: string;
    createdAt?: string;
    updatedAt?: string;
}